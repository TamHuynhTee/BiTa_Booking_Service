const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');
const { appointmentService, serviceService } = require('../services');
const paypal = require('paypal-rest-sdk');
const paypalConfig = require('../config/paypal');
const moment = require('moment');

paypal.configure(paypalConfig);

const createAppointment = catchAsync(async (req, res) => {
  const { business, service, branch, hasDeposit, startTime, duration, price, depositPrice, notify, payNow } = req.body;
  const date = new Date();
  const now = moment(date).utc().add(7, 'hours').toDate();
  if (moment(startTime).isBefore(now, 'minute')) throw new ApiError(httpStatus.NOT_FOUND, 'Giờ hẹn không còn hợp lệ');
  req.body.endTime = moment(startTime).add(duration, 'm').toDate();
  req.body.customer = req.user._id;
  const paymentType = payNow ? 'FullyPaid' : 'PartialPaid';
  const money = payNow ? price : hasDeposit ? depositPrice : -1;
  const paymentBill = payNow ? 'thanh toán phí dịch vụ' : 'thanh toán phí cọc';
  delete req.body.duration;
  delete req.body.payNow;
  //   xác định số tiền cần thanh toán
  const serviceDetail = await serviceService.getServiceById(service);
  if (!serviceDetail) throw new ApiError(httpStatus.NOT_FOUND, 'Dịch vụ không tồn tại');
  const appointment = await appointmentService.createAppointment(req.body);
  // Nếu thanh toán
  if (money !== -1) {
    const costUSD = Math.round((money / 22600) * 100) / 100;
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `http://localhost:5000/v1/appointment/success-payment?costUSD=${costUSD}&appointment=${appointment._id}&paymentType=${paymentType}`,
        cancel_url: 'http://localhost:3000/payment-denied',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: `${serviceDetail.name}, ${paymentBill}`,
                sku: serviceDetail._id,
                price: costUSD,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: costUSD,
          },
          description: serviceDetail.description,
        },
      ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            sendSuccess(res, payment.links[i].href, httpStatus.OK);
          }
        }
      }
    });
  } else {
    // Nếu không thanh toán
    sendSuccess(res, appointment, httpStatus.CREATED, 'Đã tạo cuộc hẹn');
  }
  //   sendSuccess(res, {}, httpStatus.CREATED, 'Đã tạo cuộc hẹn');
});

const doneAppointment = catchAsync(async (req, res) => {
  req.body.state = 'Done';
  req.body.payment = 'FullyPaid';
  const appointment = await appointmentService.updateAppointment(req.body);
  sendSuccess(res, appointment, httpStatus.OK, 'Đã hoàn tất cuộc hẹn');
});

const updateAppointmentCustomer = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.body.appointmentId);
  const now = moment().utc().add(7, 'hours').toDate();
  if (moment(now).isAfter(appointment.startTime, 'minute'))
    throw new ApiError(httpStatus.NOT_FOUND, 'Không thể chỉnh sửa cuộc hẹn đã qua giờ hẹn.');
  const check = moment().utc().add(7, 'hours').add(15, 'minutes').toDate();
  if (moment(check).isAfter(appointment.startTime, 'minute'))
    throw new ApiError(httpStatus.NOT_FOUND, 'Còn 15 phút nữa đến cuộc hẹn vui lòng không chỉnh sửa.');
  const newAppointment = await appointmentService.updateAppointment(req.body);
  sendSuccess(res, newAppointment, httpStatus.OK, 'Đã cập nhật cuộc hẹn');
});

const cancelAppointment = catchAsync(async (req, res) => {
  req.body.status = 'Canceled';
  const appointment = await appointmentService.updateAppointment(req.body);
  sendSuccess(res, appointment, httpStatus.OK, 'Đã hủy cuộc hẹn');
});

const deleteAppointment = catchAsync(async (req, res) => {
  await appointmentService.deleteAppointment(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Appointment deleted');
});

const getAppointmentById = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.query.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment doesn't exists");
  sendSuccess(res, appointment, httpStatus.OK, 'Appointment found');
});

const queryAppointments = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'startTime',
    'endTime',
    'notify',
    'customer',
    'business',
    'branch',
    'service',
    'hasDeposit',
    'payment',
    'state',
  ]);
  console.log(filter);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const appointments = await appointmentService.queryAppointments(filter, options);
  sendSuccess(res, appointments, httpStatus.OK, 'Appointments found');
});

const doPaymentServicePackage = catchAsync(async (req, res, next) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;
  const costUSD = req.query.costUSD;
  const appointment = req.query.appointment;
  const paymentType = req.query.paymentType;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: costUSD,
        },
      },
    ],
  };
  let success = true;
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      success = false;
      console.log(error.response);
    } else {
      console.log('Successfully paid');
    }
  });
  console.log(success, appointment, paymentType);
  if (!success) {
    await appointmentService.deleteAppointment({ appointmentId: appointment });
    res.redirect('http://localhost:3000/payment-denied');
  } else {
    const appointmentDetail = await appointmentService.getAppointmentById(appointment);
    appointmentDetail.payment = paymentType;
    await appointmentDetail.save();
    res.redirect('http://localhost:3000/payment-success');
  }
});

module.exports = {
  createAppointment,
  doneAppointment,
  updateAppointmentCustomer,
  queryAppointments,
  getAppointmentById,
  deleteAppointment,
  cancelAppointment,
  doPaymentServicePackage,
};

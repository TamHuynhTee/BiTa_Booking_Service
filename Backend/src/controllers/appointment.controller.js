const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { appointmentService, serviceService } = require('../services');
const paypal = require('paypal-rest-sdk');
const paypalConfig = require('../config/paypal');
const moment = require('moment');

paypal.configure(paypalConfig);

const createAppointment = catchAsync(async (req, res) => {
  const { business, service, branch, hasDeposit, startTime, duration, price, depositPrice, notify, paid } = req.body;
  req.body.endTime = moment(startTime).add(duration, 'm').toDate();
  req.body.customer = req.user._id;
  delete req.body.duration;
  //   xác định số tiền cần thanh toán
  const money = paid ? price : hasDeposit ? depositPrice : -1;
  const serviceDetail = await serviceService.getServiceById(service);
  if (!serviceDetail) throw new ApiError(httpStatus.NOT_FOUND, 'Dịch vụ không tồn tại');
  const appointment = await appointmentService.createAppointment(req.body);
  //   Nếu thanh toán
  if (money !== -1) {
    const costUSD = Math.round((money / 22600) * 100) / 100;
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: `http://localhost:5000/v1/appointment/success-payment?costUSD=${costUSD}&service=${service}`,
        cancel_url: 'https://ec18b006-edosecompany.web.app/payment-denied',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: serviceDetail.name,
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
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.updateAppointment(req.body);
  sendSuccess(res, appointment, httpStatus.OK, 'Đã cập nhật cuộc hẹn');
});

const deleteAppointment = catchAsync(async (req, res) => {
  await appointmentService.deleteAppointment(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Appointment deleted');
});

const getAppointmentById = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.body.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment doesn't exists");
  sendSuccess(res, appointment, httpStatus.OK, 'Appointment found');
});

const queryAppointments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const appointments = await appointmentService.queryAppointments(filter, options);
  sendSuccess(res, appointments, httpStatus.OK, 'Appointment found');
});

const doPaymentServicePackage = catchAsync(async (req, res, next) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;
  const service = req.query.service;
  const costUSD = req.query.costUSD;
  //   const serviceDetail = await serviceService.getServiceById(service);
  //   const idDoanhNghiep = req.query.idDoanhNghiep;
  //   const existDoanhNghiep = await DoanhNghiepGiaoHang.findById(idDoanhNghiep);
  //   if (existDoanhNghiep) {
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
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log(error.response);
      res.redirect('https://ec18b006-edosecompany.web.app/payment-denied');
    } else {
      console.log('Success');
      res.redirect('https://ec18b006-edosecompany.web.app/payment-success');
    }
  });
});

module.exports = {
  createAppointment,
  updateAppointment,
  queryAppointments,
  getAppointmentById,
  deleteAppointment,
  doPaymentServicePackage,
};

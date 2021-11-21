const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { appointmentService } = require('../services');
const paypal = require('paypal-rest-sdk');
const paypalConfig = require('../config/paypal');

paypal.configure(paypalConfig);

const createAppointment = catchAsync(async (req, res) => {
  //   const appointment = await appointmentService.createAppointment(req.body);
  const { customer, business, service, branch, hasDeposit, appointmentDate, appointmentTime, price, depositPrice } =
    req.body;
  //   try {
  //     const usdToVND = await fetch('http://api.currencylayer.com/live?access_key=850c0fcf6f72562147d4385b30a0aa64&format=1')
  //     var dataUsdToVND = await usdToVND.json();
  // }
  // catch {
  //     res.status(400).send({message : "Có lỗi trong quá trình thanh toán"})
  // }
  // var VND = dataUsdToVND.quotes.USDVND;
  //     var costUSD = Math.round((totalCost/VND) * 100) / 100;
  //   const create_payment_json = {
  //     "intent": "sale",
  //     "payer": {
  //         "payment_method": "paypal"
  //     },
  //     "redirect_urls": {
  //         "return_url": "http://localhost:3000/success",
  //         "cancel_url": "http://localhost:3000/cancel"
  //     },
  //     "transactions": [{
  //         "item_list": {
  //             "items": [{
  //                 "name": "Redhock Bar Soap",
  //                 "sku": "001",
  //                 "price": costUSD,
  //                 "currency": "USD",
  //                 "quantity": 1
  //             }]
  //         },
  //         "amount": {
  //             "currency": "USD",
  //             "total": "25.00"
  //         },
  //         "description": "Washing Bar soap"
  //     }]
  // };

  // paypal.payment.create(create_payment_json, function (error, payment) {
  //   if (error) {
  //       throw error;
  //   } else {
  //       for(let i = 0;i < payment.links.length;i++){
  //         if(payment.links[i].rel === 'approval_url'){
  //           res.redirect(payment.links[i].href);
  //         }
  //       }
  //   }
  // });
  console.log(req.body);
  sendSuccess(res, appointment, httpStatus.CREATED, 'Đã tạo cuộc hẹn');
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

module.exports = { createAppointment, updateAppointment, queryAppointments, getAppointmentById, deleteAppointment };

// async createPaymentServicePackage (req, res, next){
//     const maGoiDV =  req.query.maGoiDV;
//     const tenGoiDV = req.query.tenGoiDV;
//     const totalCost = req.query.totalCost;
//     const token = req.headers.authorization;
//     const idDoanhNghiep = await verifyToken(token);
//     //const idDoanhNghiep = "60a20d581090f40004ba0ad5";

//     try {
//         const usdToVND = await fetch('http://api.currencylayer.com/live?access_key=850c0fcf6f72562147d4385b30a0aa64&format=1')
//         var datausdToVND = await usdToVND.json();
//     }
//     catch {
//         res.status(400).send({message : "Có lỗi trong quá trình thanh toán"})
//     }
//     var VND = datausdToVND.quotes.USDVND;
//     var costUSD = Math.round((totalCost/VND) * 100) / 100;
//     var create_payment_json = {
//         "intent": "sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": `https://edosecompany-server.herokuapp.com/business/service-packages/do-payment/?maGoiDV=${maGoiDV}&idDoanhNghiep=${idDoanhNghiep}&costUSD=${costUSD}`,
//             "cancel_url": "http://localhost:4200/payment-denied"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{
//                     "name": tenGoiDV,
//                     "sku": tenGoiDV,
//                     "price": costUSD,
//                     "currency": "USD",
//                     "quantity": 1
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": costUSD
//             },
//             "description": "This is the payment description."
//         }]
//       };
//       paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for(let i = 0;i < payment.links.length;i++){
//               if(payment.links[i].rel === 'approval_url'){
//                 //res.redirect(payment.links[i].href);
//                 res.status(200).send({url: payment.links[i].href})
//               }
//             }
//         }
//       });
// }
// async doPaymentServicePackage (req, res, next){
//     const paymentId = req.query.paymentId;
//     const payerId = req.query.PayerID;
//     const maGoiDV =  req.query.maGoiDV;
//     const idDoanhNghiep = req.query.idDoanhNghiep;
//     const costUSD = req.query.costUSD;
//     const existDoanhNghiep = await DoanhNghiepGiaoHang.findById(idDoanhNghiep)
//     if (existDoanhNghiep){
//         const execute_payment_json = {
//             "payer_id": payerId,
//             "transactions": [{
//                 "amount": {
//                     "currency": "USD",
//                     "total": costUSD
//                 }
//             }]
//           };
//           paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//             if (error) {
//                 console.log(error.response);
//                 throw error;
//             } else {
//               DoanhNghiepGiaoHang.findOneAndUpdate({_id : idDoanhNghiep, goiDichVu: {$elemMatch: {trangThai: "unpaid", maGoiDV: maGoiDV}}}, {$set: {'goiDichVu.$.trangThai' : "paid"}}, { new : true})
//                 .then(() => {
//                     res.redirect("https://ec18b006-edosecompany.web.app/payment-success")
//                 })
//                 .catch(next)
//           }})
//     }
//     else
//     {
//         res.redirect("https://ec18b006-edosecompany.web.app/payment-denied")
//     }

// }

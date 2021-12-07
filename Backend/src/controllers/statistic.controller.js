const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('./return.controller');
const pick = require('../utils/pick');
const { statisticService } = require('../services');

const statsYear = [
  { month: 'Jan', count: 0 },
  { month: 'Feb', count: 0 },
  { month: 'Mar', count: 0 },
  { month: 'Apr', count: 0 },
  { month: 'May', count: 0 },
  { month: 'Jun', count: 0 },
  { month: 'Jul', count: 0 },
  { month: 'Aug', count: 0 },
  { month: 'Sep', count: 0 },
  { month: 'Oct', count: 0 },
  { month: 'Nov', count: 0 },
  { month: 'Dec', count: 0 },
];

const getRevenueBusiness = catchAsync(async (req, res) => {
  const revenue = statsYear.slice();
  const data = await statisticService.getRevenueBusiness(req.query);
  data.forEach((rev) => {
    revenue[rev._id - 1].count = rev.revenue;
  });
  sendSuccess(res, revenue, httpStatus.OK, 'Successfully get data');
});

const getRevenueManager = catchAsync(async (req, res) => {
  const data = await statisticService.getRevenueManager(req.query);
  sendSuccess(res, data, httpStatus.OK, 'Successfully get data');
});

const getNewBusinessData = catchAsync(async (req, res) => {
  const data = await statisticService.getNewBusinessData(req.query);
  sendSuccess(res, data, httpStatus.OK, '');
});

const getRegisterData = catchAsync(async (req, res) => {
  const data = await statisticService.getRegisterData(req.query);
  sendSuccess(res, data, httpStatus.OK, '');
});

const getAppointmentData = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getBusinessStatistic = catchAsync(async (req, res) => {
  const serviceNumber = await statisticService.countBusinessService(req.query.businessId);
  const branchNumber = await statisticService.countBusinessBranch(req.query.businessId);
  const appointmentNumber = await statisticService.countBusinessAppointment(req.query.businessId);

  const serviceStats = await statisticService.getServiceStats(req.query);
  const branchStats = await statisticService.getBranchStats(req.query);
  const appointmentStats = await statisticService.getAppointmentStats(req.query);
  const services = [...statsYear];
  const branches = [...statsYear];
  const appointments = [...statsYear];
  serviceStats.forEach((ser) => {
    services[ser._id - 1].count = ser.count;
  });
  branchStats.forEach((bra) => {
    branches[bra._id - 1].count = bra.count;
  });
  appointmentStats.forEach((app) => {
    appointments[app._id - 1].count = app.count;
  });
  sendSuccess(
    res,
    {
      serviceNumber,
      branchNumber,
      appointmentNumber,
      services,
      branches,
      appointments,
    },
    httpStatus.OK,
    'Successfully get stats'
  );
});

module.exports = {
  getRevenueBusiness,
  getNewBusinessData,
  getRevenueManager,
  getRegisterData,
  getAppointmentData,
  getBusinessStatistic,
};

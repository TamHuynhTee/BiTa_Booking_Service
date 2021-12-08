const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { sendSuccess } = require('./return.controller');
const pick = require('../utils/pick');
const { statisticService } = require('../services');

const STATS_YEAR = [
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
  const revenue = JSON.parse(JSON.stringify(STATS_YEAR));
  const data = await statisticService.getRevenueBusiness(req.query);
  data.forEach((rev) => {
    revenue[rev._id - 1].count = rev.revenue;
  });
  sendSuccess(res, revenue, httpStatus.OK, 'Successfully get data');
});

const getRevenueManager = catchAsync(async (req, res) => {
  const revenue = JSON.parse(JSON.stringify(STATS_YEAR));
  const data = await statisticService.getRevenueManager(req.query);
  data.forEach((rev) => {
    revenue[rev._id - 1].count = rev.revenue;
  });
  sendSuccess(res, revenue, httpStatus.OK, 'Successfully get data');
});

const getNewBusinessData = catchAsync(async (req, res) => {
  const business = JSON.parse(JSON.stringify(STATS_YEAR));
  const data = await statisticService.getNewBusinessData(req.query);
  data.forEach((rev) => {
    business[rev._id - 1].count = rev.count;
  });
  sendSuccess(res, business, httpStatus.OK, '');
});

const getRegisterData = catchAsync(async (req, res) => {
  const register = JSON.parse(JSON.stringify(STATS_YEAR));
  const data = await statisticService.getRegisterData(req.query);
  data.forEach((rev) => {
    register[rev._id - 1].count = rev.count;
  });
  sendSuccess(res, register, httpStatus.OK, '');
});

const getBusinessStatistic = catchAsync(async (req, res) => {
  const serviceNumber = await statisticService.countBusinessService(req.query.businessId);
  const branchNumber = await statisticService.countBusinessBranch(req.query.businessId);
  const appointmentNumber = await statisticService.countBusinessAppointment(req.query.businessId);

  const serviceStats = await statisticService.getServiceStats(req.query);
  const branchStats = await statisticService.getBranchStats(req.query);
  const appointmentStats = await statisticService.getAppointmentStats(req.query);
  const services = JSON.parse(JSON.stringify(STATS_YEAR));
  const branches = JSON.parse(JSON.stringify(STATS_YEAR));
  const appointments = JSON.parse(JSON.stringify(STATS_YEAR));
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

const getAdminStatistic = catchAsync(async (req, res) => {
  const userNumber = await statisticService.countTotalUser();
  const businessNumber = await statisticService.countTotalBusiness();
  const users = JSON.parse(JSON.stringify(STATS_YEAR));
  const businesses = JSON.parse(JSON.stringify(STATS_YEAR));
  const userStats = await statisticService.getRegisterData(req.query);
  const businessStats = await statisticService.getNewBusinessData(req.query);
  userStats.forEach((user) => {
    users[user._id - 1].count = user.count;
  });
  businessStats.forEach((bus) => {
    businesses[bus._id - 1].count = bus.count;
  });
  sendSuccess(
    res,
    {
      userNumber,
      businessNumber,
      users,
      businesses,
    },
    httpStatus.OK,
    'Successfully get stats'
  );
});

const getManagerStatistic = catchAsync(async (req, res) => {
  // total services, business, appointment, category
  // revenue, services, business stats
  const serviceNumber = await statisticService.countTotalService();
  const businessNumber = await statisticService.countTotalBusiness();
  const appointmentNumber = await statisticService.countTotalAppointment();
  const categoryNumber = await statisticService.countTotalCategory();
  const services = JSON.parse(JSON.stringify(STATS_YEAR));
  const businesses = JSON.parse(JSON.stringify(STATS_YEAR));
  const appointments = JSON.parse(JSON.stringify(STATS_YEAR));
  const serviceStats = await statisticService.getAllServiceStats(req.query);
  const businessStats = await statisticService.getNewBusinessData(req.query);
  const appointmentStats = await statisticService.getAllAppointmentStats(req.query);
  serviceStats.forEach((ser) => {
    services[ser._id - 1].count = ser.count;
  });
  businessStats.forEach((bus) => {
    businesses[bus._id - 1].count = bus.count;
  });
  appointmentStats.forEach((app) => {
    appointments[app._id - 1].count = app.count;
  });
  sendSuccess(
    res,
    {
      serviceNumber,
      businessNumber,
      appointmentNumber,
      categoryNumber,
      services,
      businesses,
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
  getBusinessStatistic,
  getAdminStatistic,
  getManagerStatistic,
};

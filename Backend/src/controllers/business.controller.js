const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { businessService, branchService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const createBusiness = catchAsync(async (req, res) => {
  await businessService.createBusiness(req.body);
  sendSuccess(res, {}, httpStatus.CREATED, 'Created');
});

const updateBusinessInfo = catchAsync(async (req, res) => {
  const service = await businessService.updateBusinessInfo(req.body);
  sendSuccess(res, {}, httpStatus.Ok, 'Business info changed');
});

const deleteBusinessById = catchAsync(async (req, res) => {
  await businessService.deleteBusinessById(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Business deleted');
});

const getBusinessById = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.query.businessId);
  if (!business) throw new ApiError(httpStatus.NOT_FOUND, "Business doesn't exists");
  sendSuccess(res, business, httpStatus.OK, 'Business found');
});

const queryBusinesses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['businessName', 'displayName', 'ownerName', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const businesses = await businessService.queryBusinesses(filter, options);
  sendSuccess(res, businesses, httpStatus.OK, 'Businesses found');
});

module.exports = {
  createBusiness,
  updateBusinessInfo,
  deleteBusinessById,
  getBusinessById,
  queryBusinesses,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, businessService } = require('../services');
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
  const business = await businessService.getBusinessById(req.body.businessId);
  if (!business) throw new ApiError(httpStatus.NOT_FOUND, "Business doesn't exists");
  sendSuccess(res, { business }, httpStatus.OK, 'Business found');
});




module.exports = {
  createBusiness,
  updateBusinessInfo,
  deleteBusinessById,
  getBusinessById
};

const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

const getRevenueBusiness = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getRevenueManager = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getNewBusinessData = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getRegisterData = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getLoginData = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

const getAppointmentData = catchAsync(async (req, res) => {
  sendSuccess(res, {}, httpStatus.OK, '');
});

module.exports = {
  getRevenueBusiness,
  getNewBusinessData,
  getRevenueManager,
  getRegisterData,
  getAppointmentData,
  getLoginData,
};

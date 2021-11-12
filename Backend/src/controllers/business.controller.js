const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, businessService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const updateBusinessInfo = catchAsync(async (req, res) => {
  console.log(req.body);
  sendSuccess(res, {}, httpStatus.Ok, 'Business info changed');
});

module.exports = { updateBusinessInfo };

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, businessService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const registerCustomer = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = await tokenService.generateAuthTokens(user);
  const emailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, emailToken);
  sendSuccess(res, { token }, httpStatus.CREATED, 'User registered.');
});

const registerBusiness = catchAsync(async (req, res) => {
  await businessService.createBusiness(req.body);
  await emailService.sendWelcomeBusinessEmail(req.body.email);
  sendSuccess(res, {}, httpStatus.CREATED, 'Business registered.');
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);
  const { role } = user;
  sendSuccess(res, { token, role }, httpStatus.OK, 'Logged in.');
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  sendSuccess(res, { token: resetPasswordToken }, httpStatus.OK, 'Reset email sent.');
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  sendSuccess(res, {}, httpStatus.NO_CONTENT, 'Password reset.');
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.body.token);
  sendSuccess(res, { token: req.body.token }, httpStatus.OK, 'Email confirmed.');
});

const approveBusiness = catchAsync(async (req, res) => {
  if (req.body.decision) {
    await authService.approveBusiness(req.body.businessId);
    sendSuccess(res, {}, httpStatus.NO_CONTENT, 'Approved business');
  } else {
    await authService.rejectBusiness(req.body.businessId);
    sendSuccess(res, {}, httpStatus.NO_CONTENT, 'Rejected business');
  }
});

const getCurrentUser = catchAsync(async (req, res) => {
  if (!req.user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  if (req.user.role === 'business') {
    const business = await businessService.getBusinessByAccountId(req.user._id);
    if (!business) throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
    sendSuccess(res, { user: req.user, business }, httpStatus.OK, 'Found business account');
  } else sendSuccess(res, { user: req.user }, httpStatus.OK, 'Found account');
});

module.exports = {
  registerCustomer,
  registerBusiness,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  approveBusiness,
  getCurrentUser,
};

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, businessService } = require('../services');
const { sendSuccess } = require('./return.controller');

const registerCustomer = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body, 'user');
  const token = await tokenService.generateAuthTokens(user);
  const emailToken = await tokenService.generateVerifyEmailToken(user);
  await emailService.sendVerificationEmail(user.email, emailToken);
  sendSuccess(res, { token }, httpStatus.CREATED);
});

const registerBusiness = catchAsync(async (req, res) => {
  console.log(req.body);
  await businessService.createBusiness(req.body);
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

module.exports = {
  registerCustomer,
  registerBusiness,
  login,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

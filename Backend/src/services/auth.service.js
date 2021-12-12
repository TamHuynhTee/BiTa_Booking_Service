const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const businessService = require('./business.service');
const emailService = require('./email.service');
const { Token } = require('../models');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai email hoặc mật khẩu');
  }
  if (!(await userService.checkVerifyEmail(user._id))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Chưa xác nhận email');
  if (!(await userService.checkIsActive(user._id))) throw new ApiError(httpStatus.UNAUTHORIZED, 'Tài khoản đang bị chặn');
  return user;
};

/**
 * Reset password
 * @param {string} oldPassword
 * @param {string} newPassword
 * @returns {Promise}
 */
const changePassword = async (userId, updateBody) => {
  const { oldPassword, newPassword } = updateBody;
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Người dùng không tồn tại');
  }
  if (!(await user.isPasswordMatch(oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sai mật khẩu');
  }
  await userService.updateUserById(user.id, { password: newPassword });
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user || !verifyEmailTokenDoc) {
      throw new Error();
    } else {
      await userService.updateUserById(user.id, { isEmailVerified: true });
      await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    }
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed' + error);
  }
};

/**
 * Approve business
 * @param {string} businessId
 * @returns {Promise}
 */
const approveBusiness = async (businessId) => {
  try {
    const business = await businessService.getBusinessById(businessId);
    if (!business) throw new Error();
    await businessService.updateBusinessById(business.id, { isActive: true, isConfirmed: true });
    const user = await userService.getUserById(business.businessAccount);
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
    await emailService.sendApproveBusinessEmail(user.email, verifyEmailToken, user.username);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Business approvement failed');
  }
};

const rejectBusiness = async (businessId) => {
  try {
    const business = await businessService.getBusinessById(businessId);
    if (!business) throw new Error();
    const user = await userService.getUserById(business.businessAccount);
    if (!user) throw new Error();
    await emailService.sendRejectBusinessEmail(user.email);
    await businessService.deleteBusinessById(businessId);
    await userService.deleteUserById(business.businessAccount);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Business rejection failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  resetPassword,
  verifyEmail,
  approveBusiness,
  rejectBusiness,
  changePassword,
};

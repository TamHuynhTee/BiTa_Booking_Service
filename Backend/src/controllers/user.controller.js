const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { sendSuccess } = require('./return.controller');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
  sendSuccess(res, { user }, httpStatus, 'User created');
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.query.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy người dùng');
  }
  sendSuccess(res, user, httpStatus.OK, 'User found');
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const changeUserAccess = catchAsync(async (req, res) => {
  const user = await userService.updateUserAccess(req.body.userId);
  sendSuccess(res, user, httpStatus.OK, 'Đã thay đổi quyền truy cập');
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const queryUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['username', 'firstName', 'email', 'phoneNumber', 'gender', 'isActive', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const users = await userService.queryUsers(filter, options);
  sendSuccess(res, users, httpStatus.OK, 'Users found');
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  queryUsers,
  changeUserAccess,
};

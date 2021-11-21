const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody, role = 'user') => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.usernameExists(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
  }
  if (await User.isPhoneTaken(userBody.phoneNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already exists');
  }
  userBody.role = role;
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

const checkVerifyEmail = async (id) => {
  const user = await getUserById(id);
  const { isEmailVerified } = user;
  return isEmailVerified;
};

const checkIsActive = async (id) => {
  const user = await getUserById(id);
  const { isActive } = user;
  return isActive;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ $or: [{ email: email }, { username: email }] });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.usernameExists(updateBody.username, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already exists');
  }
  if (await User.isPhoneTaken(updateBody.phoneNumber, userId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already exists');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUserAvatarById = async (userId, avatar) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.avatar = avatar;
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserAvatarById,
  deleteUserById,
  checkVerifyEmail,
  checkIsActive,
};

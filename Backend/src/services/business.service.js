const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Business, User } = require('../models');

/**
 * Create new business
 * @param {Object} businessBody
 * @returns {Promise}
 */
const createBusiness = async (businessBody) => {
  if (await Business.nameExists(businessBody.businessName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Business name already taken');
  }
  if (await Business.displayNameExists(businessBody.displayName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Display name already taken');
  }
  const businessAccount = {
    username: businessBody.username,
    surName: businessBody.ownerName.substr(0, businessBody.ownerName.indexOf(' ')),
    firstName: businessBody.ownerName.substr(businessBody.ownerName.indexOf(' ') + 1),
    email: businessBody.email,
    phoneNumber: businessBody.phoneNumber,
    password: businessBody.password,
  };
  delete businessBody.email;
  delete businessBody.username;
  delete businessBody.phoneNumber;
  delete businessBody.password;
  const user = await userService.createUser(businessAccount, 'business');
  businessBody.businessAccount = user._id;
  return Business.create(businessBody);
};

const getBusinessById = async (id) => {
  return Business.findById(id);
};

const getBusinessByAccountId = async (businessAccount) => {
  return Business.findOne({ businessAccount: businessAccount });
};

/**
 * Update business by id
 * @param {ObjectId} businessId
 * @param {Object} updateBody
 * @returns {Promise<Business>}
 */
const updateBusinessById = async (businessId, updateBody) => {
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  if (await Business.nameExists(updateBody.businessName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Business name already taken');
  }
  if (await Business.displayNameExists(updateBody.displayName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Display name already taken');
  }
  if (await User.isEmailTaken(updateBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isPhoneTaken(updateBody.phoneNumber)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number already exists');
  }
  Object.assign(business, updateBody);
  await business.save();
  return business;
};

/**
 * Delete business by id
 * @param {ObjectId} businessId
 * @returns {Promise<Business>}
 */
const deleteBusinessById = async (businessId) => {
  const business = await getBusinessById(businessId);
  if (!business) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Business not found');
  }
  await business.remove();
  return business;
};

const queryBusinesses = async (filter, options) => {
  const businesses = await Business.paginate(filter, options);
  return businesses;
};

module.exports = {
  createBusiness,
  getBusinessById,
  updateBusinessById,
  deleteBusinessById,
  getBusinessByAccountId,
  queryBusinesses,
};

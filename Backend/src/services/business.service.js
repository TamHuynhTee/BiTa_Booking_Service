const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Business } = require('../models');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const createBusiness = async (businessBody) => {
  if (await Business.nameExists(businessBody.businessName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Business name already taken');
  }
  await Business.create(businessBody);
};

const getBusinessById = async (id) => {
  return Business.findById(id);
};

module.exports = {
  createBusiness,
  getBusinessById,
};

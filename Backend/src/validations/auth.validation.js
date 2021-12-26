const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const registerCustomer = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    firstName: Joi.string(),
    surName: Joi.string(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required().custom(password),
    gender: Joi.string(),
  }),
};

const registerBusiness = {
  body: Joi.object().keys({
    businessName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    businessCertificate: Joi.string().allow(null, ''),
    shortDescription: Joi.string().allow(null, ''),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const updateProfile = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    username: Joi.string().allow(null, ''),
    firstName: Joi.string(),
    surName: Joi.string(),
    gender: Joi.string(),
    dayOfBirth: Joi.date(),
  }),
};

const updateAvatar = {
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    token: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const approveBusiness = {
  body: Joi.object().keys({
    businessId: Joi.string().required(),
    decision: Joi.boolean().required(),
  }),
};

module.exports = {
  registerCustomer,
  registerBusiness,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  approveBusiness,
  updateProfile,
  updateAvatar,
  changePassword,
};

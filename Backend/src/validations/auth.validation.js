const Joi = require('joi');
const { password } = require('./custom.validation');

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
    registeredName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    shortDescription: Joi.string(),
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

const verifyEmail = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  registerCustomer,
  registerBusiness,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

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
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  registerCustomer,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
};

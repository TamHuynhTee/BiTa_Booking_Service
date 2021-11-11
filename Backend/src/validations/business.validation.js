const Joi = require('joi');

const updateBusinessInfo = {
  body: Joi.object().keys({
    businessName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    businessCertificate: Joi.string().allow(null, ''),
    shortDescription: Joi.string().allow(null, ''),
  }),
};

module.exports = {
  updateBusinessInfo,
};

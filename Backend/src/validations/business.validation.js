const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBusiness = {
  body: Joi.object().keys({
    businessName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    isActive: Joi.boolean().allow(null),
    businessAccount: Joi.string().required().custom(objectId),
    businessCertificate: Joi.string().allow(null, ''),
    shortDescription: Joi.string().allow(null),
}),
}

const updateBusinessInfo = {
  body: Joi.object().keys({
    businessName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    businessCertificate: Joi.string().allow(null, ''),
    shortDescription: Joi.string().allow(null, ''),
  }),
}

const deleteBusinessById = {
  body: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

const getBusinessById = {
  body: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createBusiness,
  updateBusinessInfo,
  deleteBusinessById,
  getBusinessById
};

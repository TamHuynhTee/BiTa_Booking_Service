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
};

const updateBusinessInfo = {
  body: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
    businessName: Joi.string().required(),
    displayName: Joi.string().required(),
    ownerName: Joi.string().required(),
    shortDescription: Joi.string().allow(null, ''),
  }),
};

const deleteBusinessById = {
  body: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

const setHeadquarter = {
  body: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
    branchId: Joi.string().required().custom(objectId),
  }),
};

const getBusinessById = {
  query: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

const queryBusinesses = {
  query: Joi.object().keys({
    keyword: Joi.string().allow(null, ''),
    filter: Joi.string().valid('businessName', 'displayName', 'ownerName'),
    isActive: Joi.boolean().allow(null),
    isConfirmed: Joi.boolean().allow(null),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createBusiness,
  updateBusinessInfo,
  deleteBusinessById,
  getBusinessById,
  queryBusinesses,
  setHeadquarter,
};

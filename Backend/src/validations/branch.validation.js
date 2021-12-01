const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBranch = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    business: Joi.string().custom(objectId).required(),
    address: Joi.object({
      street: Joi.string().required(),
      ward: Joi.string().required(),
      district: Joi.string().required(),
      province: Joi.string().required(),
    }),
    coordinates: Joi.array().allow(null),
  }),
};

const updateBranch = {
  body: Joi.object().keys({
    branchId: Joi.string().custom(objectId).required(),
    name: Joi.string().allow(null),
    business: Joi.string().custom(objectId).allow(null),
    address: Joi.object({
      street: Joi.string().required(),
      ward: Joi.string().required(),
      district: Joi.string().required(),
      province: Joi.string().required(),
    }),
    coordinates: Joi.array().allow(null),
    services: Joi.array().items(Joi.string().custom(objectId)).optional(),
  }),
};

const deleteBranch = {
  body: Joi.object().keys({
    branchId: Joi.string().custom(objectId).required(),
  }),
};

const getBranchById = {
  query: Joi.object().keys({
    branchId: Joi.string().required().custom(objectId),
  }),
};

const getBranchByService = {
  query: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
  }),
};

const getAllBranches = {
  query: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

const changeBranchActivation = {
  body: Joi.object().keys({
    branchId: Joi.string().custom(objectId),
  }),
};

const queryBranches = {
  query: Joi.object().keys({
    keyword: Joi.string().allow(null, ''),
    filter: Joi.string().valid('name', 'address'),
    isActive: Joi.boolean(),
    business: Joi.string().optional().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
  queryBranches,
  getBranchByService,
  getAllBranches,
  changeBranchActivation,
};

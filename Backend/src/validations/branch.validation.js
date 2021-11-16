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
  }),
};

const deleteBranch = {
  body: Joi.object().keys({
    branchId: Joi.string().custom(objectId).required(),
  }),
};

const getBranchById = {
  body: Joi.object().keys({
    branchId: Joi.string().required().custom(objectId),
  }),
};

const queryBranches = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = { createBranch, updateBranch, deleteBranch, getBranchById, queryBranches };

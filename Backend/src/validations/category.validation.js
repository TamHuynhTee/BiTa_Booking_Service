const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    thumbnail: Joi.string().allow('', null),
  }),
};

const updateCategory = {
  body: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
    name: Joi.string().allow('', null),
    code: Joi.string().allow('', null),
    thumbnail: Joi.string().allow('', null),
  }),
};

const deleteCategory = {
  body: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const getCategoryById = {
  query: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const queryCategories = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  queryCategories,
};

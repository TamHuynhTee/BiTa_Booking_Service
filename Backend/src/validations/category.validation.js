const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
  }),
};

const updateCategory = {
  body: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
    name: Joi.string().required(),
    code: Joi.string().allow('', null),
  }),
};

const deleteCategory = {
  body: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const getCategoryById = {
  body: Joi.object().keys({
    categoryId: Joi.string().required().custom(objectId),
  }),
};

const getAllCategories = {
  query: Joi.object().keys({
    _limit: Joi.number().positive(),
    _skip: Joi.number().positive(),
  }),
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};

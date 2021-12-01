const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    business: Joi.string().required().custom(objectId),
    category: Joi.string().required().custom(objectId),
    price: Joi.number().optional(),
    hasDeposit: Joi.boolean().optional(),
    depositPrice: Joi.number().optional(),
    duration: Joi.object({
      quantity: Joi.number().positive(),
      unit: Joi.string().valid('minute', 'hour'),
    }),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    schedule: Joi.array().items(
      Joi.object({
        weekDay: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        time: Joi.array().items(Joi.string()),
      })
    ),
  }),
};

const updateService = {
  body: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
    name: Joi.string().optional(),
    category: Joi.string().optional().custom(objectId),
    price: Joi.number().optional(),
    hasDeposit: Joi.boolean().optional(),
    depositPrice: Joi.number().optional(),
    duration: Joi.object({
      quantity: Joi.number().positive(),
      unit: Joi.string().valid('minute', 'hour'),
    }),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    schedule: Joi.array().items(
      Joi.object({
        weekDay: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        time: Joi.array().items(Joi.string()),
      })
    ),
  }),
};

const deleteService = {
  query: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
  }),
};

const getServiceById = {
  query: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
  }),
};

const getAllServices = {
  query: Joi.object().keys({
    businessId: Joi.string().required().custom(objectId),
  }),
};

const changeServiceActivation = {
  body: Joi.object().keys({
    serviceId: Joi.string().custom(objectId),
  }),
};

const queryServices = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    isActive: Joi.boolean(),
    minPrice: Joi.number().allow(null),
    maxPrice: Joi.number().allow(null),
    business: Joi.string().optional().custom(objectId),
    category: Joi.string().optional().custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  queryServices,
  getAllServices,
  changeServiceActivation,
};

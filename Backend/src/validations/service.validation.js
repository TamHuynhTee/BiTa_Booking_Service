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
    schedule: Joi.array().items(
      Joi.object({
        weekDay: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        time: Joi.array().items(Joi.string()),
      })
    ),
  }),
};

const deleteService = {
  body: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
  }),
};

const getServiceById = {
  body: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
  }),
};

const queryServices = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = { createService, updateService, deleteService, getServiceById, queryServices };

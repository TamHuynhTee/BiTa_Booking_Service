const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().custom(objectId),
    business: Joi.string().custom(objectId),
    hasDeposit: Joi.boolean().allow(null),
    depositPrice: Joi.number().required(),
  })
}

const updateService = {
  body: Joi.object().keys({
    serviceId: Joi.string().required().custom(objectId),
    name: Joi.string().allow(null),
    price: Joi.number().allow(null),
    category: Joi.string().custom(objectId),
    hasDeposit: Joi.boolean().allow(null),
    depositPrice: Joi.number().allow(null),
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
module.exports = {createService, updateService,deleteService, getServiceById};




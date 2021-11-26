const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewAppointment = {
  body: Joi.object().keys({
    customerName: Joi.string().required(),
    customerPhoneNumber: Joi.string().required(),
    business: Joi.string().required().custom(objectId),
    service: Joi.string().required().custom(objectId),
    branch: Joi.string().optional().custom(objectId),
    price: Joi.number().required(),
    hasDeposit: Joi.boolean(),
    depositPrice: Joi.number().optional(),
    notify: Joi.string().optional().valid('AsScheduled', 'MaybeSoon', 'MaybeLate'),
    paid: Joi.boolean(),
    duration: Joi.number(),
    startTime: Joi.date(),
  }),
};

module.exports = { createNewAppointment };

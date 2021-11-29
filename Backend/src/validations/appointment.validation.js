const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNewAppointment = {
  body: Joi.object().keys({
    customerName: Joi.string().required(),
    customerPhoneNumber: Joi.string().required(),
    business: Joi.string().required().custom(objectId),
    service: Joi.string().required().custom(objectId),
    branch: Joi.string().allow(null).custom(objectId),
    price: Joi.number().allow(null),
    hasDeposit: Joi.boolean().allow(null),
    depositPrice: Joi.number().allow(null),
    notify: Joi.string().allow(null).valid('AsScheduled', 'MaybeSoon', 'MaybeLate'),
    payNow: Joi.boolean(),
    duration: Joi.number(),
    startTime: Joi.date(),
  }),
};

const updateAppointmentCustomer = {
  body: Joi.object().keys({
    appointmentId: Joi.string().custom(objectId),
    notify: Joi.string().valid('AsScheduled', 'MaybeSoon', 'MaybeLate'),
  }),
};

const doneAppointment = {
  body: Joi.object().keys({
    appointmentId: Joi.string().custom(objectId),
  }),
};

const getAppointmentById = {
  query: Joi.object().keys({
    appointmentId: Joi.string().required().custom(objectId),
  }),
};

const cancelAppointment = {
  body: Joi.object().keys({
    appointmentId: Joi.string().required().custom(objectId),
  }),
};

const queryAppointments = {
  query: Joi.object().keys({
    startTime: Joi.date().allow(null),
    endTime: Joi.date().allow(null),
    payment: Joi.string().allow(null, '').valid('NotPaid', 'PartialPaid', 'FullyPaid'),
    hasDeposit: Joi.boolean().allow(null),
    state: Joi.string().valid('Pending', 'Done', 'Canceled'),
    notify: Joi.string().allow(null).valid('AsScheduled', 'MaybeSoon', 'MaybeLate'),
    customer: Joi.string().allow(null).custom(objectId),
    business: Joi.string().allow(null).custom(objectId),
    service: Joi.string().allow(null).custom(objectId),
    branch: Joi.string().allow(null).custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createNewAppointment,
  getAppointmentById,
  queryAppointments,
  updateAppointmentCustomer,
  cancelAppointment,
  doneAppointment,
};

const Joi = require('joi');
const { objectId } = require('./custom.validation');

const customerReview = {
  body: Joi.object().keys({
    reviewId: Joi.string().required().custom(objectId),
    rating: Joi.number().allow(null),
    comment: Joi.string().allow(null, ''),
    review: Joi.boolean(),
  }),
};

const queryReview = {
  query: Joi.object().keys({
    customer: Joi.string().allow(null).custom(objectId),
    service: Joi.string().allow(null).custom(objectId),
    appointment: Joi.string().allow(null).custom(objectId),
    state: Joi.string().allow(null).valid('Pending', 'Reviewed'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  customerReview,
  queryReview,
};

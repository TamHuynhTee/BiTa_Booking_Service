const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { reviewService, serviceService } = require('../services');
const { sendSuccess } = require('./return.controller');
const moment = require('moment');
const ApiError = require('../utils/ApiError');

const customerReview = catchAsync(async (req, res) => {
  const { review, ...rest } = req.body;
  if (review) {
    rest.state = 'Reviewed';
    rest.reviewedAt = moment.utc().add(7, 'hours').toDate();
    const review = await reviewService.updateReview(rest);
    const totalRate = await reviewService.getServiceSumRating(review.service._id);
    const totalReview = await reviewService.countServiceReview(review.service._id);
    console.log(review, totalRate, totalReview);
    await serviceService.updateService({ serviceId: review.service, rating: totalRate[0].rating / totalReview });
    sendSuccess(res, review, httpStatus.OK, 'Chân thành cảm ơn sự đánh giá của bạn');
  } else {
    await reviewService.deleteReview(req.body.reviewId);
    sendSuccess(res, {}, httpStatus.OK, 'Đã hủy đánh giá');
  }
});

const queryReviews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['customer', 'service', 'appointment', 'state']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const reviews = await reviewService.queryReviews(filter, options);
  sendSuccess(res, reviews, httpStatus.OK, 'Reviews found');
});

const countNewReviews = catchAsync(async (req, res) => {
  const reviews = await reviewService.countCustomerNewReview(req.user._id);
  sendSuccess(res, reviews, httpStatus.OK, 'Reviews found');
});

const sumServiceRating = catchAsync(async (req, res) => {
  const sum = await reviewService.getServiceSumRating(req.query.serviceId);
  sendSuccess(res, sum, httpStatus.OK, 'Summation completed');
});

module.exports = { customerReview, queryReviews, countNewReviews, sumServiceRating };

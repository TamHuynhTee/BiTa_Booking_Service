const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const customerReview = catchAsync(async (req, res) => {
  const { review, ...rest } = req.body;
  if (review) {
    rest.state = 'Reviewed';
    const review = await reviewService.updateReview(rest);
    const totalRate = reviewService.getServiceSumRating(review.service);
    const totalReview = reviewService.countServiceReview(review.service);
    console.log(totalRate, totalReview);
    sendSuccess(res, review, httpStatus.OK, 'Đánh giá thành công');
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

module.exports = { customerReview, queryReviews };

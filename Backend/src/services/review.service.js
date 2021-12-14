const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Review } = require('../models');

const createReview = async (reviewBody) => {
  await Review.create(reviewBody);
};

const getReviewById = async (reviewId) => {
  return Review.findById(reviewId);
};

const updateReview = async (reviewBody) => {
  const review = await getReviewById(reviewBody.reviewId);
  if (!review) throw new ApiError(httpStatus.NOT_FOUND, 'Đánh giá không tồn tại');
  Object.assign(review, reviewBody);
  return review.save();
};

const deleteReview = async (reviewId) => {
  const review = await Review.create(reviewId);
  if (!review) throw new ApiError(httpStatus.NOT_FOUND, 'Đánh giá không tồn tại');
  await review.remove();
};

const getServiceSumRating = async (serviceId) => {
  return Review.aggregate([
    {
      $match: {
        service: mongoose.Types.ObjectId(serviceId),
      },
    },
    {
      $group: { rating: { $sum: '$rating' } },
    },
  ]);
};

const countServiceReview = async (serviceId) => {
  return Review.countDocuments({ service: mongoose.Types.ObjectId(serviceId) });
};

const queryReviews = async (filter, options) => {
  const reviews = await Review.paginate(filter, options);
  return reviews;
};

module.exports = {
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
  queryReviews,
  getServiceSumRating,
  countServiceReview,
};

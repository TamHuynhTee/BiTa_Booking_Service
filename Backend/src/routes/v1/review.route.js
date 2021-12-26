const express = require('express');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.put('/customer-review', auth('customer'), validate(reviewValidation.customerReview), reviewController.customerReview);
router.get('/query-reviews', validate(reviewValidation.queryReview), reviewController.queryReviews);
router.get('/count-new-reviews', auth('customer'), reviewController.countNewReviews);
router.get('/sum-service-rating', reviewController.sumServiceRating);

module.exports = router;

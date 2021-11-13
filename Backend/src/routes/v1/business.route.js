const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { businessController } = require('../../controllers');
const { businessValidation } = require('../../validations');

const router = express.Router();

// router.put(
//   '/create-business',
//   auth(),
//   validate(businessValidation.createBusiness),
//   businessController.createBusiness
// );

router.put(
  '/update-business-info',
  auth(),
  validate(businessValidation.updateBusinessInfo),
  businessController.updateBusinessInfo
);

router.delete(
  '/delete-business',
  auth(),
  validate(businessValidation.deleteBusinessById),
  businessController.deleteBusinessById
);
router.get(
  '/get-category-by-id',
  auth('manageCategories'),
  validate(businessValidation.getBusinessById),
  businessController.getBusinessById
);

module.exports = router;

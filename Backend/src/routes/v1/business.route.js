const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { businessController } = require('../../controllers');
const { businessValidation } = require('../../validations');
const queryBusiness = require('../../middlewares/queryBusiness');

const router = express.Router();

// router.put(
//   '/create-business',
//   auth(),
//   validate(businessValidation.createBusiness),
//   businessController.createBusiness
// );

router.put(
  '/update-business-info',
  auth('business'),
  validate(businessValidation.updateBusinessInfo),
  businessController.updateBusinessInfo
);

router.delete(
  '/delete-business',
  auth(),
  validate(businessValidation.deleteBusinessById),
  businessController.deleteBusinessById
);
router.get('/get-business-by-id', validate(businessValidation.getBusinessById), businessController.getBusinessById);
router.get(
  '/query-business',
  validate(businessValidation.queryBusinesses),
  queryBusiness.queryBusinesses,
  businessController.queryBusinesses
);

module.exports = router;

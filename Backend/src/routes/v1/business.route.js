const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { businessController } = require('../../controllers');
const { businessValidation } = require('../../validations');
const queryBusiness = require('../../middlewares/queryBusiness');

const router = express.Router();

router.put(
  '/update-business-info',
  auth('business'),
  validate(businessValidation.updateBusinessInfo),
  businessController.updateBusinessInfo
);

router.delete(
  '/delete-business',
  auth('business'),
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
router.put(
  '/set-headquarter',
  auth('business'),
  validate(businessValidation.setHeadquarter),
  businessController.setHeadquarter
);

module.exports = router;

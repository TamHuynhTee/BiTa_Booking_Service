const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { businessController } = require('../../controllers');
const { businessValidation } = require('../../validations');

const router = express.Router();

router.put(
  '/update-business-info',
  auth(),
  validate(businessValidation.updateBusinessInfo),
  businessController.updateBusinessInfo
);

module.exports = router;

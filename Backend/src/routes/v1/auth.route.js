const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/registerCustomer', validate(authValidation.registerCustomer), authController.registerCustomer);
router.post('/registerBusiness', validate(authValidation.registerBusiness), authController.registerBusiness);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post(
  '/approve-business',
  auth('approveBusiness'),
  validate(authValidation.approveBusiness),
  authController.approveBusiness
);
router.get('/get-current-user', auth(), authController.getCurrentUser);
module.exports = router;



const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const queryUser = require('../../middlewares/queryUser');

const router = express.Router();

router.get('/query-user', auth(), validate(userValidation.queryBusinesses), queryUser.queryUsers, userController.queryUsers);
router.get('/get-user-by-id', auth(), validate(userValidation.getUser), userController.getUser);
router.put(
  '/change-user-access',
  auth('manageUsers'),
  validate(userValidation.changeUserAccess),
  userController.changeUserAccess
);

module.exports = router;

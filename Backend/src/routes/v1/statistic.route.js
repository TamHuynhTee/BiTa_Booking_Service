const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { statisticController } = require('../../controllers');
const router = express.Router();

router.get('/get-business-revenue', auth('business'), statisticController.getRevenueBusiness);
router.get('/get-manager-revenue', auth('manager'), statisticController.getRevenueManager);
router.get('/get-business-statistic', auth('business'), statisticController.getBusinessStatistic);
router.get('/get-admin-statistic', auth('admin'), statisticController.getAdminStatistic);
router.get('/get-manager-statistic', auth('manager'), statisticController.getManagerStatistic);
router.get('/get-user-register-statistic', auth('admin'), statisticController.getRegisterData);
router.get('/get-new-business-statistic', auth('business'), statisticController.getNewBusinessData);

module.exports = router;

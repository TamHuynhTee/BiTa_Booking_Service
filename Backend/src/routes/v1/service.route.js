const express = require('express');
const validate = require('../../middlewares/validate');
const queryService = require('../../middlewares/queryService');
const auth = require('../../middlewares/auth');
const { serviceController } = require('../../controllers');
const { serviceValidation } = require('../../validations');

const router = express.Router();

router.post('/create-service', auth('service'), validate(serviceValidation.createService), serviceController.createService);

router.put('/update-service', auth('service'), validate(serviceValidation.updateService), serviceController.updateService);

router.delete(
  '/delete-service',
  auth('service'),
  validate(serviceValidation.deleteService),
  serviceController.deleteService
);

router.get('/get-service-by-id', validate(serviceValidation.getServiceById), serviceController.getServiceById);
router.get('/get-all-services', validate(serviceValidation.getAllServices), serviceController.getAllServices);
router.get(
  '/query-service',
  validate(serviceValidation.queryServices),
  queryService.queryServices,
  serviceController.queryServices
);

module.exports = router;

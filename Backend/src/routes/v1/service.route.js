const express = require('express');
const router = express.Router();
const servicesController = require('../../controllers/services.controller');


router.put('/:id', servicesController.update);
router.delete('/:id', servicesController.delete);
router.post('/create',servicesController.create);
router.get('/', servicesController.getService);

module.exports = router;

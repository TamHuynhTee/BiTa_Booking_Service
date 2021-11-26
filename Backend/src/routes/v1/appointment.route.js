const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { appointmentController } = require('../../controllers');
const { appointmentValidation } = require('../../validations');

const router = express.Router();

router.post(
  '/create-appointment',
  auth('appointment'),
  validate(appointmentValidation.createNewAppointment),
  appointmentController.createAppointment
);
router.put('/update-appointment', auth('appointment'), appointmentController.updateAppointment);
router.get('/success-payment', appointmentController.doPaymentServicePackage);
router.get('/get-appointment-by-id', auth('appointment'), appointmentController.getAppointmentById);
router.delete('/delete-appointment', auth('appointment'), appointmentController.deleteAppointment);

module.exports = router;

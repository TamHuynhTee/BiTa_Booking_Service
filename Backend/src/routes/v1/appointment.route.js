const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { appointmentController } = require('../../controllers');
const { appointmentValidation } = require('../../validations');
const queryAppointment = require('../../middlewares/queryAppointment');

const router = express.Router();

router.post(
  '/create-appointment',
  auth('customer'),
  validate(appointmentValidation.createNewAppointment),
  appointmentController.createAppointment
);
router.put(
  '/update-appointment-customer',
  auth('customer'),
  validate(appointmentValidation.updateAppointmentCustomer),
  appointmentController.updateAppointmentCustomer
);
router.put(
  '/done-appointment',
  auth('business'),
  validate(appointmentValidation.doneAppointment),
  appointmentController.doneAppointment
);
router.put(
  '/cancel-appointment',
  auth('appointment'),
  validate(appointmentValidation.cancelAppointment),

  appointmentController.cancelAppointment
);

router.get(
  '/get-appointment-by-id',
  auth(),
  validate(appointmentValidation.getAppointmentById),
  appointmentController.getAppointmentById
);
router.delete('/delete-appointment', auth('appointment'), appointmentController.deleteAppointment);
router.get('/success-payment', appointmentController.doPaymentServicePackage);
router.get(
  '/query-appointment',
  auth(),
  validate(appointmentValidation.queryAppointments),
  queryAppointment.queryAppointment,
  appointmentController.queryAppointments
);
module.exports = router;

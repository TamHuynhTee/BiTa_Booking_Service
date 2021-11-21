const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { appointmentController } = require('../../controllers');

const router = express.Router();

router.post('/create-appointment', auth('appointment'), appointmentController.createAppointment);
router.put('/update-appointment', auth('appointment'), appointmentController.updateAppointment);
router.get('/get-appointment-by-id', auth('appointment'), appointmentController.getAppointmentById);
router.delete('/delete-appointment', auth('appointment'), appointmentController.deleteAppointment);

module.exports = router;

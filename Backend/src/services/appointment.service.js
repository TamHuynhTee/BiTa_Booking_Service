const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Appointment } = require('../models');

const createAppointment = async (appointmentBody) => {
  return Appointment.create(appointmentBody);
};

const getAppointmentById = async (appointmentId) => {
  return Appointment.findById(appointmentId);
};

const updateAppointment = async (appointmentBody) => {
  const appointment = await getAppointmentById(appointmentBody.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment doesn't exists");
  Object.assign(appointment, appointmentBody);
  await appointment.save();
};

const deleteAppointment = async (appointmentBody) => {
  const appointment = await getAppointmentById(appointmentBody.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Sppointment doesn't exists");
  await appointment.remove();
  return appointment;
};

const queryAppointments = async (filter, options) => {
  const appointments = await Appointment.paginate(filter, options);
  return appointments;
};

module.exports = { createAppointment, updateAppointment, deleteAppointment, queryAppointments, getAppointmentById };

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Appointment } = require('../models');

const createAppointment = async (appointmentBody) => {
  const pendingApps = await getAppointmentsToCheck(
    appointmentBody.customer,
    appointmentBody.startTime,
    appointmentBody.endTime
  );
  if (!pendingApps.length) return Appointment.create(appointmentBody);
  else throw new ApiError(httpStatus.NOT_FOUND, 'Bị trùng với cuộc hẹn khác');
};

const getAppointmentById = async (appointmentId) => {
  return Appointment.findById(appointmentId);
};

const getAppointmentsToCheck = async (customerId, startTime, endTime) => {
  return Appointment.find({
    customer: customerId,
    state: 'Pending',
    $or: [
      { endTime: { $gt: startTime }, startTime: { $lt: startTime } }, // S1 < S < E1
      { startTime: { $lt: endTime }, endTime: { $gt: endTime } }, // S1 < E < E1
      { startTime: { $lt: startTime }, endTime: { $gt: endTime } }, // S1 < S < E < E1
      { startTime: { $gt: startTime }, endTime: { $lt: endTime } }, // S < S1 < E1 < E
    ],
  });
};

const updateAppointment = async (appointmentBody) => {
  const appointment = await getAppointmentById(appointmentBody.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment doesn't exists");
  if (appointment.state === 'Done') throw new ApiError(httpStatus.NOT_FOUND, 'Không thể cập nhật cuộc hẹn đã hoàn tất');
  if (appointment.state === 'Canceled') throw new ApiError(httpStatus.NOT_FOUND, 'Không thể cập nhật cuộc hẹn đã bị hủy');
  Object.assign(appointment, appointmentBody);
  return appointment.save();
};

const deleteAppointment = async (appointmentBody) => {
  const appointment = await getAppointmentById(appointmentBody.appointmentId);
  if (!appointment) throw new ApiError(httpStatus.NOT_FOUND, "Appointment doesn't exists");
  await appointment.remove();
  return appointment;
};

const queryAppointments = async (filter, options) => {
  const appointments = await Appointment.paginate(filter, options);
  return appointments;
};

module.exports = { createAppointment, updateAppointment, deleteAppointment, queryAppointments, getAppointmentById };

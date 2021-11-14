const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { serviceService, userService } = require('../services');

//createService
const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  sendSuccess(res, { service }, httpStatus.OK, 'Created service');
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateService(req.body);
  sendSuccess(res, { service }, httpStatus.OK, 'Service updated');
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteService(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Service deleted');
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.body.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  sendSuccess(res, { service }, httpStatus.OK, 'Service found');
});

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
};

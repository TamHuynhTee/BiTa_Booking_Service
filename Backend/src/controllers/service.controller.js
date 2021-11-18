const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { serviceService, businessService, categoryService } = require('../services');

//createService
const createService = catchAsync(async (req, res) => {
  const service = await serviceService.createService(req.body);
  sendSuccess(res, service, httpStatus.CREATED, 'Created service');
});

const updateService = catchAsync(async (req, res) => {
  const service = await serviceService.updateService(req.body);
  sendSuccess(res, service, httpStatus.OK, 'Service updated');
});

const deleteService = catchAsync(async (req, res) => {
  await serviceService.deleteService(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Service deleted');
});

const getServiceByIdFull = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.query.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  const business = await businessService.getBusinessById(service.business);
  const category = await categoryService.getCategoryById(service.category);
  sendSuccess(res, { service, business, category }, httpStatus.OK, 'Service found');
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceById(req.query.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  sendSuccess(res, service, httpStatus.OK, 'Service found');
});

const queryServices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'isActive', 'business']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const services = await serviceService.queryServices(filter, options);
  sendSuccess(res, services, httpStatus.OK, 'Services found');
});

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  queryServices,
  getServiceByIdFull,
};

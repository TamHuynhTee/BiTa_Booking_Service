const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Service } = require('../models');
const { businessService } = require('.');

const createService = async (serviceBody) => {
  //   if (await Service.nameExists(serviceBody.name)) throw new ApiError(httpStatus.BAD_REQUEST, 'Service name already taken');
  const service = await Service.create(serviceBody);
  return service;
};

const getServiceById = async (serviceId) => {
  return Service.findById(serviceId);
};

const getAllServices = async (businessId) => {
  return Service.find({ business: businessId }).select({ name: 1, category: 0, business: 0 });
};

const updateService = async (serviceBody) => {
  const service = await getServiceById(serviceBody.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  if (await Service.nameExists(serviceBody.name, serviceBody.serviceId))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists');
  Object.assign(service, serviceBody);
  await service.save();
};

const deleteService = async (serviceBody) => {
  const service = await getServiceById(serviceBody.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  await service.remove();
  return service;
};

const queryServices = async (filter, options) => {
  const services = await Service.paginate(filter, options);
  return services;
};

module.exports = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  queryServices,
  getAllServices,
};

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Service } = require('../models');
const { businessService } = require('.');

const createService = async (serviceBody) => {
  //   if (await Service.nameExists(serviceBody.name)) throw new ApiError(httpStatus.BAD_REQUEST, 'Service name already taken');
  const service = await Service.create(serviceBody);
  const business = await businessService.getBusinessById(serviceBody.business);
  if (!business) throw new ApiError(httpStatus.NOT_FOUND, 'Doanh nghiệp không tồn tại');
  business.services.push(service._id);
  await business.save();
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
  //   if (await Service.nameExists(serviceBody.name, serviceBody.serviceId))
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists');
  Object.assign(service, serviceBody);
  await service.save();
};

const updateServiceUsage = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  Object.assign(service, { usage: service.usage + 1 });
  await service.save();
};

const updateServiceActivation = async (serviceId) => {
  const service = await getServiceById(serviceId);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy dịch vụ');
  }
  Object.assign(service, { isActive: !service.isActive });
  await service.save();
  return service;
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
  updateServiceActivation,
  updateServiceUsage,
};

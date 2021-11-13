const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Service } = require('../models');

const createService = async (serviceBody) => {
    if (await Service.nameExists(serviceBody.name))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Service name already taken');
    return Service.create(serviceBody)
}

const getServiceById = async (serviceId) => {
  return Service.findById(serviceId);
};

const updateService = async (serviceBody) => {
  const service = await getServiceById(serviceBody.serviceId);
  console.log(service)
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  if (await Service.nameExists(serviceBody.name)) throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists');
  Object.assign(service, serviceBody);
  await service.save();
};

const deleteService = async (serviceBody) => {
  const service = await getServiceById(serviceBody.serviceId);
  if (!service) throw new ApiError(httpStatus.NOT_FOUND, "Service doesn't exists");
  await service.remove();
  return service;
};


module.exports = {
   createService,
   updateService,
   deleteService,
   getServiceById,
  };



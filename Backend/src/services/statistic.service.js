const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { Appointment, Service, User, Business, Branch, Category } = require('../models');

// Manager
const countTotalService = async () => {
  return Service.countDocuments();
};
const countTotalBusiness = async () => {
  return Business.countDocuments();
};
const countTotalAppointment = async () => {
  return Appointment.countDocuments();
};
const countTotalCategory = async () => {
  return Category.countDocuments();
};
const getRevenueManager = async (query) => {
  return Appointment.aggregate([
    {
      $match: {
        state: 'Done',
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$price' } },
    },
  ]);
};
const getAllServiceStats = async (query) => {
  return Service.aggregate([
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
const getNewBusinessData = async (query) => {
  return Business.aggregate([
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
const getAllAppointmentStats = async (query) => {
  return Appointment.aggregate([
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
// Admin
const countTotalUser = async () => {
  return User.countDocuments({ role: 'user' });
};
const getRegisterData = async (query) => {
  return User.aggregate([
    {
      $match: {
        role: 'user',
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
// Business
const countBusinessService = async (businessId) => {
  return Service.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
};
const countBusinessBranch = async (businessId) => {
  return Branch.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
};
const countBusinessAppointment = async (businessId) => {
  return Appointment.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
};
const getServiceStats = async (query) => {
  return Service.aggregate([
    {
      $match: {
        business: mongoose.Types.ObjectId(query.businessId),
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
const getBranchStats = async (query) => {
  return Branch.aggregate([
    {
      $match: {
        business: mongoose.Types.ObjectId(query.businessId),
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
const getAppointmentStats = async (query) => {
  return Appointment.aggregate([
    {
      $match: {
        business: mongoose.Types.ObjectId(query.businessId),
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } },
    },
  ]);
};
const getRevenueBusiness = async (query) => {
  return Appointment.aggregate([
    {
      $match: {
        business: mongoose.Types.ObjectId(query.businessId),
        state: 'Done',
      },
    },
    {
      $redact: {
        $cond: [
          {
            $eq: [{ $year: '$createdAt' }, ~~query.year],
          },
          '$$KEEP',
          '$$PRUNE',
        ],
      },
    },
    {
      $group: { _id: { $month: '$createdAt' }, revenue: { $sum: '$price' } },
    },
  ]);
};
module.exports = {
  getRevenueBusiness,
  getNewBusinessData,
  getRevenueManager,
  getRegisterData,
  countBusinessService,
  countBusinessBranch,
  countBusinessAppointment,
  getServiceStats,
  getBranchStats,
  getAppointmentStats,
  countTotalUser,
  countTotalBusiness,
  countTotalService,
  countTotalAppointment,
  countTotalCategory,
  getAllServiceStats,
  getAllAppointmentStats,
};

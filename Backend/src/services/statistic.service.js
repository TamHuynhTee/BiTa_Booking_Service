const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
const { Appointment, Service, User, Business, Branch } = require('../models');

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
      $group: { _id: { $month: '$createdAt' }, count: { $sum: '$price' } },
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

const countBusinessService = async (businessId) => {
  return Service.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
};

const countBusinessBranch = async (businessId) => {
  return Branch.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
};
const countBusinessAppointment = async (businessId) => {
  return Appointment.countDocuments({ business: mongoose.Types.ObjectId(businessId) });
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
};

const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Branch } = require('../models');

const createBranch = async (branchBody) => {
  if (await Branch.nameExists(branchBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Branch name already taken');
  }
  return Branch.create(branchBody);
};

const getBranchById = async (branchId) => {
  return Branch.findById(branchId);
};

const getBranchesByService = async (serviceId) => {
  return Branch.find({ services: serviceId, isActive: true });
};

const updateBranch = async (branchBody) => {
  const branch = await getBranchById(branchBody.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  //   if (await Branch.nameExists(branchBody.name)) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Branch name already taken');
  //   }
  Object.assign(branch, branchBody);
  await branch.save();
};

const deleteBranch = async (branchBody) => {
  const branch = await getBranchById(branchBody.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  await branch.remove();
  return branch;
};

const queryBranches = async (filter, options) => {
  const branches = await Branch.paginate(filter, options);
  return branches;
};

module.exports = { createBranch, getBranchById, updateBranch, deleteBranch, queryBranches, getBranchesByService };

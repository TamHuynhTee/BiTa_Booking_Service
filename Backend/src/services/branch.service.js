const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Branch, Business } = require('../models');
const businessService = require('./business.service');

const createBranch = async (branchBody) => {
  const branch = await Branch.create(branchBody);
  const business = await businessService.getBusinessById(branchBody.business);
  if (!business) throw new ApiError(httpStatus.NOT_FOUND, 'Doanh nghiệp không tồn tại');
  business.branches.push(branch._id);
  if (branchBody.headquarter) business.headquarter = branch._id;
  await business.save();
  return branch;
};

const getBranchById = async (branchId) => {
  return Branch.findById(branchId);
};

const getBranchesByService = async (serviceId) => {
  return Branch.find({ services: serviceId, isActive: true }).select({ name: 1, services: 0, address: 1 });
};

const getAllBranches = async (businessId) => {
  return Branch.find({ business: businessId }).select({ name: 1, services: 0, address: 1 });
};

const updateBranch = async (branchBody) => {
  const branch = await getBranchById(branchBody.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  Object.assign(branch, branchBody);
  await branch.save();
};

const deleteBranch = async (branchBody) => {
  const branch = await getBranchById(branchBody.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  await branch.remove();
  return branch;
};

const updateBranchActivation = async (branchId) => {
  const branch = await getBranchById(branchId);
  if (!branch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy chi nhánh');
  }
  Object.assign(branch, { isActive: !branch.isActive });
  await branch.save();
  return branch;
};

const queryBranches = async (filter, options) => {
  const branches = await Branch.paginate(filter, options);
  return branches;
};

module.exports = {
  createBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
  queryBranches,
  getBranchesByService,
  getAllBranches,
  updateBranchActivation,
};

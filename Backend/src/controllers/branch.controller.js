const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { branchService } = require('../services');

const createBranch = catchAsync(async (req, res) => {
  const branch = await branchService.createBranch(req.body);
  sendSuccess(res, branch, httpStatus.CREATED, 'Đã tạo chi nhánh mới');
});

const updateBranch = catchAsync(async (req, res) => {
  const branch = await branchService.updateBranch(req.body);
  sendSuccess(res, branch, httpStatus.OK, 'Đã cập nhật chi nhánh');
});

const deleteBranch = catchAsync(async (req, res) => {
  await branchService.deleteBranch(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Branch deleted');
});

const getBranchById = catchAsync(async (req, res) => {
  const branch = await branchService.getBranchById(req.query.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  sendSuccess(res, branch, httpStatus.OK, 'Branch found');
});

const getBranchesByService = catchAsync(async (req, res) => {
  const branches = await branchService.getBranchesByService(req.query.serviceId);
  if (!branches) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  sendSuccess(res, branches, httpStatus.OK, 'Branch found');
});

const getAllBranches = catchAsync(async (req, res) => {
  const branches = await branchService.getAllBranches(req.query.businessId);
  if (!branches) throw new ApiError(httpStatus.NOT_FOUND, "Branches doesn't exists");
  sendSuccess(res, branches, httpStatus.OK, 'Branches found');
});

const changeBranchActivation = catchAsync(async (req, res) => {
  const branch = await branchService.updateBranchActivation(req.body.branchId);
  sendSuccess(res, branch, httpStatus.OK, 'Đã thay đổi trạng thái chi nhánh');
});

const queryBranches = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'name',
    'address.street',
    'address.ward',
    'address.district',
    'address.province',
    'isActive',
    'business',
  ]);
  console.log(filter);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const branches = await branchService.queryBranches(filter, options);
  sendSuccess(res, branches, httpStatus.OK, 'Branches found');
});

module.exports = {
  createBranch,
  queryBranches,
  updateBranch,
  deleteBranch,
  getBranchById,
  getBranchesByService,
  getAllBranches,
  changeBranchActivation,
};

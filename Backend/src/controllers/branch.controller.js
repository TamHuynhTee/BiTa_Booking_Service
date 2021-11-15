const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');
const { branchService } = require('../services');

const createBranch = catchAsync(async (req, res) => {
  const branch = await branchService.createBranch(req.body);
  sendSuccess(res, branch, httpStatus.CREATED, 'Created');
});

const updateBranch = catchAsync(async (req, res) => {
  const branch = await branchService.updateBranch(req.body);
  sendSuccess(res, branch, httpStatus.OK, 'Branch updated');
});

const deleteBranch = catchAsync(async (req, res) => {
  await branchService.deleteBranch(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Branch deleted');
});

const getBranchById = catchAsync(async (req, res) => {
  const branch = await branchService.getBranchById(req.body.branchId);
  if (!branch) throw new ApiError(httpStatus.NOT_FOUND, "Branch doesn't exists");
  sendSuccess(res, branch, httpStatus.OK, 'Branch found');
});

const queryBranches = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const branches = await branchService.queryBranches(filter, options);
  sendSuccess(res, branches, httpStatus.OK, 'Branches found');
});

module.exports = { createBranch, queryBranches, updateBranch, deleteBranch, getBranchById };

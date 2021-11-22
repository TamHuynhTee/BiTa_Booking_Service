const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const createCategory = catchAsync(async (req, res) => {
  await categoryService.createCategory(req.body);
  sendSuccess(res, {}, httpStatus.CREATED, 'Đã tạo loại dịch vụ mới');
});

const updateCategory = catchAsync(async (req, res) => {
  await categoryService.updateCategory(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Đã cập nhật loại dịch vụ');
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Category deleted');
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.query.categoryId);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category doesn't exists");
  sendSuccess(res, category, httpStatus.OK, 'Category found');
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategories();
  sendSuccess(res, result, httpStatus.OK, 'Categories found');
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};

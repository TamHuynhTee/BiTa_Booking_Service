const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Category } = require('../models');

const createCategory = async (categoryBody) => {
  if (await Category.nameExists(categoryBody.name)) throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists');
  if (await Category.codeExists(categoryBody.code)) throw new ApiError(httpStatus.BAD_REQUEST, 'Code already exists');
  await Category.create(categoryBody);
};

const getCategoryById = async (categoryId) => {
  return Category.findById(categoryId);
};

const updateCategory = async (categoryBody) => {
  const category = await getCategoryById(categoryBody.categoryId);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category doesn't exists");
  if (await Category.nameExists(categoryBody.name)) throw new ApiError(httpStatus.BAD_REQUEST, 'Name already exists');
  if (await Category.codeExists(categoryBody.code)) throw new ApiError(httpStatus.BAD_REQUEST, 'Code already exists');
  Object.assign(category, categoryBody);
  await category.save();
};

const deleteCategory = async (categoryBody) => {
  const category = await getCategoryById(categoryBody.categoryId);
  if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category doesn't exists");
  await category.remove();
  return category;
};

const queryCategories = async (filter, options) => {
  const categories = await Category.paginate(filter, options);
  return categories;
};

const getAllCategories = async () => {
  return Category.find();
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  queryCategories,
  getAllCategories,
};

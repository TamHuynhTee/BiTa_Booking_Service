const express = require('express');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(
  '/create-category',
  auth('manageCategories'),
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);
router.put(
  '/update-category',
  auth('manageCategories'),
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory
);
router.delete(
  '/delete-category',
  auth('manageCategories'),
  validate(categoryValidation.deleteCategory),
  categoryController.deleteCategory
);
router.get('/get-category-by-id', auth(), validate(categoryValidation.getCategoryById), categoryController.getCategoryById);
router.get(
  '/get-all-categories',
  auth(),
  validate(categoryValidation.getAllCategories),
  categoryController.getAllCategories
);

module.exports = router;

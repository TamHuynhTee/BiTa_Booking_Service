const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { branchController } = require('../../controllers');
const { branchValidation } = require('../../validations');
const queryBranch = require('../../middlewares/queryBranch');

const router = express.Router();

router.post('/create-branch', auth('branch'), validate(branchValidation.createBranch), branchController.createBranch);
router.put('/update-branch', auth('branch'), validate(branchValidation.updateBranch), branchController.updateBranch);
router.delete('/delete-branch', auth('branch'), validate(branchValidation.deleteBranch), branchController.deleteBranch);
router.get('/get-branch-by-id', validate(branchValidation.getBranchById), branchController.getBranchById);
router.get('/get-branches-by-service', validate(branchValidation.getBranchByService), branchController.getBranchesByService);
router.get('/get-all-branches', validate(branchValidation.getAllBranches), branchController.getAllBranches);
router.get(
  '/query-branch',
  validate(branchValidation.queryBranches),
  queryBranch.queryBranches,
  branchController.queryBranches
);

module.exports = router;

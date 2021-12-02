const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { businessService, branchService } = require('../services');
const { sendSuccess } = require('./return.controller');
const ApiError = require('../utils/ApiError');

const createBusiness = catchAsync(async (req, res) => {
  await businessService.createBusiness(req.body);
  sendSuccess(
    res,
    {},
    httpStatus.CREATED,
    'Đăng ký doanh nghiệp thành công, hãy kiểm tra email và chờ quản trị viên của chúng tôi duyệt tài khoản của bạn.'
  );
});

const updateBusinessInfo = catchAsync(async (req, res) => {
  const { businessId, ...rest } = req.body;
  const business = await businessService.updateBusinessById(businessId, rest);
  sendSuccess(res, business, httpStatus.Ok, 'Đã cập nhật thông tin doanh nghiệp');
});

const deleteBusinessById = catchAsync(async (req, res) => {
  await businessService.deleteBusinessById(req.body);
  sendSuccess(res, {}, httpStatus.OK, 'Business deleted');
});

const getBusinessById = catchAsync(async (req, res) => {
  const business = await businessService.getBusinessById(req.query.businessId);
  if (!business) throw new ApiError(httpStatus.NOT_FOUND, "Business doesn't exists");
  sendSuccess(res, business, httpStatus.OK, 'Business found');
});

const setHeadquarter = catchAsync(async (req, res) => {
  const business = await businessService.setHeadquarter(req.body);
  sendSuccess(res, business, httpStatus.OK, 'Đã cập nhật trụ sở chính');
});

const queryBusinesses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['businessName', 'displayName', 'ownerName', 'isActive', 'isConfirmed']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const businesses = await businessService.queryBusinesses(filter, options);
  sendSuccess(res, businesses, httpStatus.OK, 'Businesses found');
});

module.exports = {
  createBusiness,
  updateBusinessInfo,
  deleteBusinessById,
  getBusinessById,
  queryBusinesses,
  setHeadquarter
};

const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const businessRoute = require('./business.route');
const branchRoute = require('./branch.route');
const appointmentRoute = require('./appointment.route');
const serviceRoute = require('./service.route');
const statisticRoute = require('./statistic.route');
const reviewRoute = require('./review.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/business',
    route: businessRoute,
  },
  {
    path: '/service',
    route: serviceRoute,
  },
  {
    path: '/branch',
    route: branchRoute,
  },
  {
    path: '/appointment',
    route: appointmentRoute,
  },
  {
    path: '/statistic',
    route: statisticRoute,
  },
  {
    path: '/review',
    route: reviewRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

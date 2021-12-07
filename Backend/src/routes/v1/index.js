const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const businessRoute = require('./business.route');
const branchRoute = require('./branch.route');
const appointmentRoute = require('./appointment.route');
const docsRoute = require('./docs.route');
const serviceRoute = require('./service.route');
const statisticRoute = require('./statistic.route');
const config = require('../../config/config');

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
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

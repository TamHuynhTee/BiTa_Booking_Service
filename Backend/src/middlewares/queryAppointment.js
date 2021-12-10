const moment = require('moment');
const queryAppointment = (req, res, next) => {
  if (req.query.keyword) {
    if (req.query.filter === 'customerName') {
      req.query.customerName = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'customerPhoneNumber') {
      req.query.customerPhoneNumber = { $regex: req.query.keyword, $options: 'si' };
    }
  }
  if (req.query.startTime) {
    req.query.startTime = { $gte: moment(req.query.startTime).add(7, 'hours').toDate() };
  }
  if (req.query.endTime) {
    req.query.endTime = { $lte: moment(req.query.endTime).add(7, 'hours').toDate() };
  }
  delete req.query.filter;
  delete req.query.keyword;
  next();
};

module.exports = { queryAppointment };

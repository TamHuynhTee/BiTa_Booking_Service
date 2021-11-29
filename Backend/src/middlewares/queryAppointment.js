const moment = require('moment');
const queryAppointment = (req, res, next) => {
  if (req.query.startTime) {
    req.query.startTime = { $gte: moment(req.query.startTime).add(7, 'hours').toDate() };
  }
  if (req.query.endTime) {
    req.query.endTime = { $lte: moment(req.query.endTime).add(7, 'hours').toDate() };
  }
  next();
};

module.exports = { queryAppointment };

const queryUsers = (req, res, next) => {
  if (req.query.keyword) {
    if (req.query.filter === 'username') {
      req.query.username = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'firstName') {
      req.query.firstName = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'email') {
      req.query.email = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'phoneNumber') {
      req.query.phoneNumber = { $regex: req.query.keyword, $options: 'si' };
    }
  }
  next();
};

module.exports = { queryUsers };

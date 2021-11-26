const queryBusinesses = (req, res, next) => {
  if (req.query.keyword) {
    if (req.query.filter === 'businessName') {
      req.query.businessName = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'displayName') {
      req.query.displayName = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'ownerName') {
      req.query.ownerName = { $regex: req.query.keyword, $options: 'si' };
    }
  }
  delete req.query.filter;
  delete req.query.keyword;
  next();
};

module.exports = { queryBusinesses };

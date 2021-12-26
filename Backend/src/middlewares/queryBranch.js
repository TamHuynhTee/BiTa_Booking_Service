const queryBranches = (req, res, next) => {
  if (req.query.keyword) {
    if (req.query.filter === 'name') {
      req.query.name = { $regex: req.query.keyword, $options: 'si' };
    }
    if (req.query.filter === 'address') {
      req.query.$or = [
        { 'address.street': { $regex: req.query.keyword, $options: 'si' } },
        { 'address.ward': { $regex: req.query.keyword, $options: 'si' } },
        { 'address.district': { $regex: req.query.keyword, $options: 'si' } },
        { 'address.province': { $regex: req.query.keyword, $options: 'si' } },
      ];
    }
  }

  delete req.query.filter;
  delete req.query.keyword;
  next();
};

module.exports = { queryBranches };

const queryBranches = (req, res, next) => {
  if (req.query.name) {
    req.query.name = { $regex: req.query.name, $options: 'si' };
  }
  next();
};

module.exports = { queryBranches };

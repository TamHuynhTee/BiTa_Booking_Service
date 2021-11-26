const queryServices = (req, res, next) => {
  if (req.query.name) {
    req.query.name = { $regex: req.query.name, $options: 'si' };
  }
  if (req.query.minPrice || req.query.maxPrice) {
    req.query.price = { $lte: req.query.maxPrice || 2000000, $gte: req.query.minPrice || 0 };
  }
  delete req.query.minPrice;
  delete req.query.maxPrice;
  next();
};

module.exports = { queryServices };

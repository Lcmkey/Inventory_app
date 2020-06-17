const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const NODE_ENV = process.env.NODE_ENV;
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    status: statusCode,
    message: error.message,
    stack: NODE_ENV === "production" ? "🥞" : error.stack,
    errors: error.errors || undefined,
  });
};

module.exports = {
  notFound,
  errorHandler,
};

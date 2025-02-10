const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const errorSources = err.errors || [
    {
      path: '',
      message: 'An unexpected error occurred',
    },
  ];

  // Log the error stack in development mode for debugging purposes
  const stack = process.env.NODE_ENV === 'development' ? err.stack : null;

  // Optionally, you can log the error for better debugging/monitoring
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack,
  });
};

export default errorHandler;

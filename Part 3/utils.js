// A utility function for error handling - like events are full (no availble slots) or trying to join same event whe already in it
exports.mongooseErrorHandler = (error) => {
  if (error.errors) var errorMessage = Object.values(error.errors)[0].message;
  return errorMessage || error.message;
};

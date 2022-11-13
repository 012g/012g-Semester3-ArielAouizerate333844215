// A utility function for error handling - like events are full (no available slots) or trying to join same event whe already in it
exports.customErrorHandler = (error) => {
  console.log('error', error);
  const errorMessage = Object.values(error.errors)[0].message;
  if (error.errors)
  return errorMessage || error.message;
};

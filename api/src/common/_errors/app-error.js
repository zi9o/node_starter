// Centralized error factory
function AppError(commonType, description, isOperational = false, details = null, customParams = null) {
  Error.call(this);
  Error.captureStackTrace(this);
  // Determine the status code of the error
  this.commonType = commonType;
  // Determine the message/object of the error => to be converted into string later
  // If description is empty then it's a syntax error within the query without logging the actual error
  this.description = description ? description : `Une erreur s'est produite lors du traitement de la requête.`;
  // If details exists => Joi validation/errors as array of details
  this.details = details;
  // isOperational=true => Programmed errors
  // isOperational=false => Internal/unCaughtException errors
  this.isOperational = isOperational;
}

module.exports = {AppError: AppError};

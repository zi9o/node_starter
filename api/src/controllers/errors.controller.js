// @flow
/**
 * Module dependencies
 */
const {SlonikError} = require('slonik');

/**
 * Get the error message from error object
 */
exports.getErrorDescription = function (err: any): string {
  if (err.details) {
    return err.details.map(v => v.message).join('<br>');
  }
  return err.message;
};

/**
 * Get the error message from error object
 */
exports.getErrorMessage = function (err: any): string {
  let message;

  if (err.code) {
    // To be used to specify each error code correspond to a specific error message
    switch (parseInt(err.code, 10)) {
    case 11000:
    case 11001:
      message = 'Unique field already exists';
      break;
    default:
      message = 'Something went wrong in query';
      // should log hints of the query/function error
      console.error(err);
    }
  } else if (err.message && (err instanceof SlonikError)) {
    console.error(err);
    message = 'Internal query error';
  } else if (err instanceof SlonikError) {
    console.error(err);
  } else if (err.details) {
    message = 'Format invalide';
    console.error(err);
  } else {
    message = err.message;
  }
  if (!message) {
    message = '';
  }
  return message;
};

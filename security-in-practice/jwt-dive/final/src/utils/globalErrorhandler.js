import { sendJsonResponse } from './responseHelper.js';

export default function (err, _req, res, _next) {
  const {
    name = 'Unknown Error',
    message = 'Something broke!',
    statusCode = 500,
  } = err;

  console.log('global: ', name, message, statusCode);

  return sendJsonResponse(res, statusCode, message);
}

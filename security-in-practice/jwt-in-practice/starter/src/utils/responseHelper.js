export function sendJsonResponse(
  res,
  statusCode,
  message = 'Success',
  data = null
) {
  return res.status(statusCode).json({
    message,
    ...(data && { data }),
  });
}

export function sendSuccessResponse(res, data, message) {
  return sendJsonResponse(res, 200, message, data);
}

export function sendNotFoundResponse(res, message = 'Not Found') {
  return sendJsonResponse(res, 404, message);
}

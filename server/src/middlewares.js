/**
 * Custom middlewares for error handling
 */

/**
 * Not found error handler - Responds with 404 status code
 * and forwards the request
 * 
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

/**
 * General error handler - Responds with the error message and the stack trace
 * if in development
 * 
 * @param error - Error
 * @param req - Request
 * @param res - Response
 * @param next - Next
 */
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack
    })
}

module.exports = {
    notFound,
    errorHandler
}
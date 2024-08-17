exports.sendResponse = (res, statusCode, data = null, message='') => {
    const response = {
        success : statusCode>=200 && statusCode < 300,
        message : message || (statusCode>=200 && statusCode < 300 ? 'Request successful' : 'An error occurred'),
        data : data || null
    };
    return res.status(statusCode).json(response);
};
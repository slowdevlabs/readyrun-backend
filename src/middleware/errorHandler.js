// 공통 에러 핸들러
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({
      success: false,
      error: {
        code: err.code || 'INTERNAL_ERROR',
        message: err.message || 'Internal server error'
      }
    });
  }
  
  module.exports = { errorHandler };
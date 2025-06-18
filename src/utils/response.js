// 표준 응답 유틸리티
exports.success = (data) => ({ success: true, data });
exports.fail = (error) => ({ success: false, error });
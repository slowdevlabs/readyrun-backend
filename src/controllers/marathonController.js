const marathonService = require('../services/marathonService');
const { success } = require('../utils/response');

// Express 비동기 핸들러 래퍼
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// 마라톤 목록 조회
exports.listMarathons = asyncHandler(async (req, res) => {
    const data = await marathonService.listMarathons(req.query, req.user?.db?.id);
    res.json(success({ marathons: data.marathons, pagination: data.pagination }));
});

// 마라톤 검색
exports.searchMarathons = asyncHandler(async (req, res) => {
    const data = await marathonService.searchMarathons(req.query, req.user?.db?.id);
    res.json(success({ marathons: data.marathons, pagination: data.pagination }));
});

// 마라톤 상세 조회
exports.getMarathonDetail = asyncHandler(async (req, res) => {
    const data = await marathonService.getMarathonDetail(req.params.id, req.user?.db?.id);
    res.json(success({ marathon: data }));
});
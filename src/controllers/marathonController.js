const marathonService = require('../services/marathonService');
const { success } = require('../utils/response');

// 마라톤 목록 조회
exports.listMarathons = async (req, res, next) => {
  try {
    const data = await marathonService.listMarathons(req.query, req.user?.db?.id);
    res.json(success({ marathons: data.marathons, pagination: data.pagination }));
  } catch (err) {
    next(err);
  }
};

// 마라톤 검색
exports.searchMarathons = async (req, res, next) => {
  try {
    const data = await marathonService.searchMarathons(req.query, req.user?.db?.id);
    res.json(success({ marathons: data.marathons, pagination: data.pagination }));
  } catch (err) {
    next(err);
  }
};

// 마라톤 상세 조회
exports.getMarathonDetail = async (req, res, next) => {
  try {
    const data = await marathonService.getMarathonDetail(req.params.id, req.user?.db?.id);
    res.json(success({ marathon: data }));
  } catch (err) {
    next(err);
  }
};
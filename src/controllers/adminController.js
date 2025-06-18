const adminService = require('../services/adminService');
const { success } = require('../utils/response');

// 승인 대기 마라톤 목록
exports.listPendingMarathons = async (req, res, next) => {
  try {
    const data = await adminService.listPendingMarathons();
    res.json(success({ marathons: data }));
  } catch (err) {
    next(err);
  }
};

// 마라톤 승인
exports.approveMarathon = async (req, res, next) => {
  try {
    await adminService.approveMarathon(req.params.id, req.user.db.id, req.body.notes, req.body.changes);
    res.json(success({ message: 'Marathon approved' }));
  } catch (err) {
    next(err);
  }
};

// 마라톤 거부
exports.rejectMarathon = async (req, res, next) => {
  try {
    await adminService.rejectMarathon(req.params.id, req.user.db.id, req.body.reason, req.body.notes);
    res.json(success({ message: 'Marathon rejected' }));
  } catch (err) {
    next(err);
  }
};
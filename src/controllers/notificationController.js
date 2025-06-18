const notificationService = require('../services/notificationService');
const { success } = require('../utils/response');

exports.listNotifications = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const data = await notificationService.listNotifications(req.user.db.id, page, limit);
    res.json(success(data));
  } catch (err) {
    next(err);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    await notificationService.markAsRead(req.user.db.id, req.params.id);
    res.json(success({ message: 'Notification marked as read' }));
  } catch (err) {
    next(err);
  }
};
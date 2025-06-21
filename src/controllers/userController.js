const userService = require('../services/userService');

// GET /api/v1/user/profile
async function getProfile(req, res, next) {
    try {
        // auth 미들웨어에서 이미 사용자 정보를 req.user.db에 সংযুক্ত했습니다.
        res.json({ success: true, data: { user: req.user.db } });
    } catch (error) {
        next(error);
    }
}

// PATCH /api/v1/user/profile
async function updateProfile(req, res, next) {
    try {
        const userId = req.user.db.id;
        const updates = req.body;

        // Firebase UID나 이메일은 변경하지 못하도록 합니다.
        delete updates.firebase_uid;
        delete updates.email;

        const updatedUser = await userService.updateUser(userId, updates);
        res.json({ success: true, data: { user: updatedUser } });
    } catch (error) {
        next(error);
    }
}

// DELETE /api/v1/user/account
async function deleteAccount(req, res, next) {
    try {
        const { uid } = req.user;
        const userId = req.user.db.id;

        await userService.deleteUser(uid, userId);

        res.json({ success: true, message: 'User account deleted successfully.' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount,
}; 
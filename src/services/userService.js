const supabase = require('../config/supabase');
const admin = require('../config/firebase');

async function updateUser(userId, updates) {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

async function deleteUser(firebaseUid, userId) {
    // 1. 데이터베이스에서 관련 데이터 삭제 (Favorites, Notifications 등)
    // ON DELETE CASCADE가 설정되어 있지 않으므로 수동으로 삭제해야 합니다.
    const { error: favoriteError } = await supabase.from('favorites').delete().eq('user_id', userId);
    if (favoriteError) throw new Error(`Failed to delete favorites: ${favoriteError.message}`);

    const { error: notificationError } = await supabase.from('notifications').delete().eq('user_id', userId);
    if (notificationError) throw new Error(`Failed to delete notifications: ${notificationError.message}`);
    
    // 2. `users` 테이블에서 사용자 삭제
    const { error: userError } = await supabase.from('users').delete().eq('id', userId);
    if (userError) throw new Error(`Failed to delete user from database: ${userError.message}`);

    // 3. Firebase Authentication에서 사용자 삭제
    try {
        await admin.auth().deleteUser(firebaseUid);
    } catch (error) {
        // Firebase에서 사용자를 삭제하지 못했을 경우, 이미 DB에서 삭제된 사용자에 대한 후속 처리가 필요할 수 있습니다.
        // 예를 들어, 로깅을 하거나 별도의 복구 프로세스를 고려할 수 있습니다.
        // 여기서는 에러를 throw하여 상위 핸들러가 처리하도록 합니다.
        throw new Error(`Failed to delete user from Firebase Auth: ${error.message}`);
    }

    return true;
}

module.exports = {
    updateUser,
    deleteUser,
}; 
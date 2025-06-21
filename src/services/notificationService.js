const supabase = require('../config/supabase');
const { toISOString } = require('../utils/dateFormatter');

/**
 * 알림 목록 조회
 */
exports.listNotifications = async (userId, page = 1, limit = 20) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return {
    notifications: toISOString(data, ['created_at']),
    pagination: {
      current_page: Number(page),
      total_pages: Math.ceil(count / limit),
      total_count: count,
      has_next: to + 1 < count,
      has_prev: from > 0
    }
  };
};

/**
 * 알림 읽음 처리
 */
exports.markAsRead = async (userId, notificationId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)
    .eq('user_id', userId);
  if (error) throw error;
};
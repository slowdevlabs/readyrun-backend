const supabase = require('../config/supabase');
const { toISOString } = require('../utils/dateFormatter');

// 승인 대기 마라톤 목록 조회
exports.listPendingMarathons = async () => {
  const { data, error } = await supabase
    .from('marathons')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return toISOString(data, ['created_at', 'date_start', 'approved_at', 'date_end', 'registration_deadline', 'updated_at']);
};

// 마라톤 승인 처리
exports.approveMarathon = async (marathonId, adminUserId, notes, changes) => {
  // status 변경, 승인 이력 기록
  const { error } = await supabase
    .from('marathons')
    .update({ status: 'active', approved_by: adminUserId, approved_at: new Date() })
    .eq('id', marathonId);
  if (error) throw error;
  await supabase.from('marathon_approvals').insert({
    marathon_id: marathonId,
    admin_user_id: adminUserId,
    action: 'approved',
    notes,
    changes_made: changes,
    new_status: 'active'
  });
};

// 마라톤 거부 처리
exports.rejectMarathon = async (marathonId, adminUserId, reason, notes) => {
  const { error } = await supabase
    .from('marathons')
    .update({ status: 'rejected', rejection_reason: reason })
    .eq('id', marathonId);
  if (error) throw error;
  await supabase.from('marathon_approvals').insert({
    marathon_id: marathonId,
    admin_user_id: adminUserId,
    action: 'rejected',
    notes,
    new_status: 'rejected'
  });
};
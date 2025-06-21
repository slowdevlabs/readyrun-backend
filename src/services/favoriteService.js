const supabase = require('../config/supabase');
const { toISOString } = require('../utils/dateFormatter');

/**
 * 즐겨찾기 목록 조회
 */
exports.listFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('marathon_id, created_at, marathons(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  const favorites = data.map(fav => ({
    ...fav.marathons,
    favorited_at: fav.created_at
  }));
  return toISOString(favorites, ['date_start', 'favorited_at']);
};

/**
 * 즐겨찾기 추가
 */
exports.addFavorite = async (userId, marathonId) => {
  // 중복 체크
  const { data: exists } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('marathon_id', marathonId)
    .maybeSingle();
  if (exists) throw { code: 'ALREADY_EXISTS', message: 'Already favorited', status: 409 };

  // 추가
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, marathon_id: marathonId });
  if (error) throw error;

  // 마라톤 favorite_count 증가 (비동기)
  supabase.rpc('increment_favorite_count', { marathon_id: marathonId });
};

/**
 * 즐겨찾기 삭제
 */
exports.removeFavorite = async (userId, marathonId) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('marathon_id', marathonId);
  if (error) throw error;

  // 마라톤 favorite_count 감소 (비동기)
  supabase.rpc('decrement_favorite_count', { marathon_id: marathonId });
};
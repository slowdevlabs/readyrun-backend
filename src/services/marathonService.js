const supabase = require('../config/supabase');

/**
 * 마라톤 목록 조회 (필터, 정렬, 페이징)
 */
exports.listMarathons = async (query, userId) => {
  const {
    page = 1,
    limit = 20,
    sort = 'date_asc',
    country,
    city,
    distance,
    date_from,
    date_to,
    tags
  } = query;

  let supaQuery = supabase
    .from('marathons')
    .select(`
      *,
      is_favorited:favorites!left(user_id)
    `, { count: 'exact' })
    .eq('status', 'active');

  if (country) supaQuery = supaQuery.eq('country', country);
  if (city) supaQuery = supaQuery.eq('city', city);
  if (distance) supaQuery = supaQuery.contains('distances', [distance]);
  if (date_from) supaQuery = supaQuery.gte('date_start', date_from);
  if (date_to) supaQuery = supaQuery.lte('date_start', date_to);
  if (tags) supaQuery = supaQuery.contains('tags', tags);

  // 정렬
  if (sort === 'date_asc') supaQuery = supaQuery.order('date_start', { ascending: true });
  if (sort === 'date_desc') supaQuery = supaQuery.order('date_start', { ascending: false });
  if (sort === 'popularity_desc') supaQuery = supaQuery.order('favorite_count', { ascending: false });

  // 페이징
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  supaQuery = supaQuery.range(from, to);

  const { data, count, error } = await supaQuery;
  if (error) throw error;

  // is_favorited 처리
  const marathons = data.map(m => ({
    ...m,
    is_favorited: !!(m.is_favorited && m.is_favorited.user_id === userId)
  }));

  return {
    marathons,
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
 * 마라톤 상세 조회
 */
exports.getMarathonDetail = async (id, userId) => {
  const { data, error } = await supabase
    .from('marathons')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) throw { code: 'NOT_FOUND', message: 'Marathon not found', status: 404 };

  // is_favorited
  let is_favorited = false;
  if (userId) {
    const { data: fav } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('marathon_id', id)
      .maybeSingle();
    is_favorited = !!fav;
  }

  // 조회수 증가 (비동기)
  supabase
    .from('marathons')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', id);

  return { ...data, is_favorited };
};

/**
 * 마라톤 검색 (full-text)
 */
exports.searchMarathons = async (query, userId) => {
  const {
    q,
    page = 1,
    limit = 20,
    sort = 'date_asc',
    country,
    city,
    distance,
    date_from,
    date_to,
    tags
  } = query;

  let supaQuery = supabase
    .from('marathons')
    .select(`
      *,
      is_favorited:favorites!left(user_id)
    `, { count: 'exact' })
    .eq('status', 'active');

  if (q) supaQuery = supaQuery.ilike('name', `%${q}%`);
  if (country) supaQuery = supaQuery.eq('country', country);
  if (city) supaQuery = supaQuery.eq('city', city);
  if (distance) supaQuery = supaQuery.contains('distances', [distance]);
  if (date_from) supaQuery = supaQuery.gte('date_start', date_from);
  if (date_to) supaQuery = supaQuery.lte('date_start', date_to);
  if (tags) supaQuery = supaQuery.contains('tags', tags);

  // 정렬
  if (sort === 'date_asc') supaQuery = supaQuery.order('date_start', { ascending: true });
  if (sort === 'date_desc') supaQuery = supaQuery.order('date_start', { ascending: false });
  if (sort === 'popularity_desc') supaQuery = supaQuery.order('favorite_count', { ascending: false });

  // 페이징
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  supaQuery = supaQuery.range(from, to);

  const { data, count, error } = await supaQuery;
  if (error) throw error;

  // is_favorited 처리
  const marathons = data.map(m => ({
    ...m,
    is_favorited: !!(m.is_favorited && m.is_favorited.user_id === userId)
  }));

  return {
    marathons,
    pagination: {
      current_page: Number(page),
      total_pages: Math.ceil(count / limit),
      total_count: count,
      has_next: to + 1 < count,
      has_prev: from > 0
    }
  };
};
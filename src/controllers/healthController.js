const supabase = require('../config/supabase');

async function checkHealth(req, res, next) {
  try {
    // Supabase에 간단한 쿼리를 보내 연결을 테스트합니다.
    const { data, error } = await supabase.from('users').select('id').limit(1);

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'API and database connection are healthy.',
      database: 'connected',
      data: data,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      success: false,
      message: 'API is running, but database connection failed.',
      database: 'disconnected',
      error: error.message,
    });
  }
}

module.exports = { checkHealth }; 
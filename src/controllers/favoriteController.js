const favoriteService = require('../services/favoriteService');
const { success } = require('../utils/response');

exports.listFavorites = async (req, res, next) => {
  try {
    const data = await favoriteService.listFavorites(req.user.db.id);
    res.json(success({ favorites: data }));
  } catch (err) {
    next(err);
  }
};

exports.addFavorite = async (req, res, next) => {
  try {
    await favoriteService.addFavorite(req.user.db.id, req.body.marathon_id);
    res.json(success({ message: 'Marathon added to favorites' }));
  } catch (err) {
    next(err);
  }
};

exports.removeFavorite = async (req, res, next) => {
  try {
    await favoriteService.removeFavorite(req.user.db.id, req.params.marathon_id);
    res.json(success({ message: 'Marathon removed from favorites' }));
  } catch (err) {
    next(err);
  }
};
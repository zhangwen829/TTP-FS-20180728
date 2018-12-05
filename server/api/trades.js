const router = require('express').Router();
const {Trade} = require('../db/models');
module.exports = router;

router.get('/user/:userId', async (req, res, next) => {
  try {
    const trades = await Trade.listTradesByUserId(req.params.userId);
    res.json(trades);
  } catch (error) {
    next(error);
  }
});
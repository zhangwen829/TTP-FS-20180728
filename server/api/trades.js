const router = require('express').Router();
const {Trade} = require('../db/models');
module.exports = router;

router.get('/user/:userId', async(req, res, next) => {
  try {
    const trades = await Trade.listTradesByUserId(req.params.userId);
    res.json(trades);
  } catch (error) {
    next(error);
  }
});

router.post('/user/:userId', async(req, res, next) => {
  try {
    await Trade.buy(
        req.params.userId, req.body.symbol, req.body.shares, req.body.price);
    res.end();
  } catch (error) {
    next(error);
  }
});
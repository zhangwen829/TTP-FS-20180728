const router = require('express').Router();
const {Holding} = require('../db/models');
module.exports = router;

router.get('/user/:userId', async(req, res, next) => {
  console.log('called');
  try {
    const holdings = await Holding.listHoldingsByUserId(req.params.userId);
    res.json(holdings);
  } catch (error) {
    next(error);
  }
});
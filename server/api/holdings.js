const router = require('express').Router();
const {Holding} = require('../db/models');
module.exports = router;

router.get('/user/:userId', async (req, res, next) => {
  try {
    const holdings = await Holding.listHoldingsByUserId(req.params.userId);
    res.json(holdings);
  } catch (error) {
    next(error);
  }
});
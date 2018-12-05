const router = require('express').Router();
module.exports = router;

router.use('/holdings', require('./holdings'));
router.use('/trades', require('./trades'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

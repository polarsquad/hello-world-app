import Router from 'express-promise-router';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

export default router;

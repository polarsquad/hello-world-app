import Router from 'express-promise-router';

export default (commit, tag) => {
  const router = Router({ mergeParams: true });
  router.get('/version', (_, res) => {
    res.status(200).json({
      commit,
      tag,
    });
  });

  router.get('/healthy', (_, res) => {
    res.status(200).json({
      status: 'ok',
    });
  });

  router.get('/suicide', (_, res) => {
    console.log('Good bye, cruel world :\'(');
    process.exit(666);
  });

  return router;
};

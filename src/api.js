import Router from 'express-promise-router';

export default (commit, tag) => {
  const router = Router({ mergeParams: true });
  router.get('/version', (_, res) => {
    res.status(200).json({
      commit: commit,
      tag: tag
    });
  });

  router.get('/healthy', (_, res) => {
    res.status(200).json({
      status: 'ok'
    });
  });

  return router;
}
import Router from 'express-promise-router';

const muscle = [];
const fillMuscle = () => {
  for (let i = 0; i < 1000; i += 1) muscle.push(1);
  setTimeout(fillMuscle, 100);
};

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

  router.get('/suicide', () => {
    console.log('Good bye, cruel world :\'(');
    process.exit(666);
  });

  router.get('/pumpup', (_, res) => {
    res.redirect('/');
    setTimeout(fillMuscle, 100);
  });

  return router;
};

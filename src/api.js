import Router from 'express-promise-router';

const muscle = [];
const fillMuscle = () => {
  for (let i = 0; i < 1000; i += 1) muscle.push(1);
};

const brainsThink = () => {
  const interval = setInterval(() => {
    let i = 0;
    while (i < 10000000) i += 1;
  }, 1);

  setTimeout(() => {
    clearInterval(interval);
    console.log('Done thinking!');
  }, 10000);
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
    setInterval(fillMuscle, 100);
  });

  router.get('/think', (_, res) => {
    res.redirect('/');
    setTimeout(brainsThink, 100);
  });

  return router;
};

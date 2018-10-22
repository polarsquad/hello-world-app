import Router from 'express-promise-router';

const startedAt = new Date();

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
      startedAt,
      namespace: process.env.NAMESPACE || 'unknown',
      podUid: process.env.POD_UID || 'unknown',
      podName: process.env.POD_NAME || 'unknown',
      podIp: process.env.POD_IP || 'unknown',
      hostIp: process.env.HOST_IP || 'unknown',
    });
  });

  router.get('/healthy', (_, res) => {
    res.status(200).json({
      status: 'ok',
    });
  });

  router.get('/suicide', (_, res) => {
    console.log('Good bye, cruel world :\'(');
    res.redirect('/');
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

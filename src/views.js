
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { template, sample } from 'lodash';
import Router from 'express-promise-router';

const IMAGES = [
  { img: '/assets/ps_jeremy.png' },
];

const render = (view, ctx = {}) => template(readFileSync(resolve(__dirname, `views/${view}.html`)))(ctx);

export default (storage) => {
  const router = Router({ mergeParams: true });

  router.get('/', (_, res) => {
    Promise.all([
      storage.get('thing'),
      storage.get('heroName'),
    ]).then(([thing, heroName]) => {
      const data = sample(IMAGES);
      data.storageName = storage.constructor.name;
      data.heroName = heroName;
      data.heroTitle = (heroName ? `Oh, you like ${heroName}, are you sure?` : 'Your favourite super hero?');
      data.details = [
        { key: 'Namespace', value: process.env.NAMESPACE || 'unknown' },
        { key: 'Pod UID', value: process.env.POD_UID || 'unknown' },
        { key: 'Pod name', value: process.env.POD_NAME || 'unknown' },
        { key: 'Pod IP', value: process.env.POD_IP || 'unknown' },
        { key: 'Host IP', value: process.env.HOST_IP || 'unknown' },
        { key: 'Thing', value: thing || 'not set' },
      ];
      res.send(render('index', data));
    });
  });

  return router;
};

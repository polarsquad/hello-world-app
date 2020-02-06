
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { template, sample } from 'lodash';
import Router from 'express-promise-router';

const IMAGES = [
  { img: '/assets/ps_blackmetal.png' },
  { img: '/assets/ps_lelukauppa.png' },
  { img: '/assets/ps_mylittlepony.png' },
  { img: '/assets/ps_santacruz.png' },
  { img: '/assets/ps_sexpistols.png' },
  { img: '/assets/ps_suicidesquad.png' },
  { img: '/assets/ps_trasher.png' },
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
      data.configmaps = get_configmaps();
      res.send(render('index', data));
    });
  });

  return router;
};

function get_configmaps()
{
  const filtered_envs = Object.keys(process.env)
  .filter(key => key.includes('configmap'))
  .reduce((obj, key) => {
    obj[key] = { key: key, value: process.env[key] };
    return obj;
  }, {});
  return filtered_envs
}

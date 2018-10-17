
import fs from 'fs';
import { template, sample } from 'lodash';
import Router from 'express-promise-router';

const router = Router({ mergeParams: true });

const IMAGES = [
  { img: '/assets/ps_blackmetal.png' },
  { img: '/assets/ps_lelukauppa.png' },
  { img: '/assets/ps_mylittlepony.png' },
  { img: '/assets/ps_santacruz.png' },
  { img: '/assets/ps_sexpistols.png' },
  { img: '/assets/ps_suicidesquad.png' },
  { img: '/assets/ps_trasher.png' },
]

router.get('/', (_, res) => {
  res.send(render('index', sample(IMAGES)))
});

const render = (view, ctx = {}) => template(fs.readFileSync(`./src/views/${view}.html`))(ctx)

export default router;

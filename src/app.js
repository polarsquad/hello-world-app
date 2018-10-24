import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import views from './views';
import api from './api';
import Memory from './storage/memory';

const storage = new Memory();

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('Time:', new Date().toISOString(), ', Url: ', req.url);
  next();
});

app.use('/api', api(storage, GIT_COMMIT, GIT_TAG));
app.use('/', views(storage));

app.use('/assets', express.static(resolve(__dirname, 'assets')));

app.close = () => { };

export default app;

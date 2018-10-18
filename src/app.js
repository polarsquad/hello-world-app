import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import views from './views';
import api from './api';

const app = express();
app.use(bodyParser.json());

app.use('/api', api(GIT_COMMIT, GIT_TAG));
app.use('/', views);

app.use('/assets', express.static(resolve(__dirname, 'assets')));

app.close = () => { };

export default app;

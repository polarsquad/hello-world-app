import express from 'express';
import { resolve } from 'path';
import bodyParser from 'body-parser';
import views from './views';
import version from './api/version';

const app = express();
app.use(bodyParser.json());

app.use('/api/version', version);
app.use('/', views);

app.use('/assets', express.static(resolve(__dirname, 'assets')));

app.close = () => { }

export default app;
import express from 'express';
import bodyParser from 'body-parser';
import views from './views';
import version from './api/version';

const app = express();
app.use(bodyParser.json());

app.use('/api/version', version);
app.use('/', views);

app.use('/assets', express.static('src/assets'))

app.close = () => { }

export default app;
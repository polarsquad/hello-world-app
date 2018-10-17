import express from 'express';
import bodyParser from 'body-parser';
import version from './api/version';

const app = express();
app.use(bodyParser.json());

app.use('/api/version', version);

app.close = () => { }

export default app;
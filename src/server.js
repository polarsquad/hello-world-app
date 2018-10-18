import { createServer } from 'http';

import app from './app';

createServer(app).listen(3000, () => {
  console.log('Api Server listening on port http://localhost:3000');
});

process.on('SIGINT', () => {
  console.log('Receive SIGINT. Shutdown!');
  process.exit();
});

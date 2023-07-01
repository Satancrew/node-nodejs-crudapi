import http from 'http';
import { router } from './router/router';
import 'dotenv/config';

const PORT = process.env.PORT;

export const server = http
  .createServer((request, response) => {
    router(request, response);
  })
  .listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });

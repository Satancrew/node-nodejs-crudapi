import http from 'http';
import { router } from './router/router'

const PORT = process.env.PORT || 4000;

const server = http
  .createServer((request, response) => {
    router(request, response);
  })
  .listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
  });

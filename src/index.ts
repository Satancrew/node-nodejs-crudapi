import http from 'http';

const PORT = process.env.PORT || 4000;

const server = http
  .createServer((request, response) => {
    response.end('Hello world');
  })
  .listen(PORT, () => {
    console.log('Server port ---', PORT);
  });

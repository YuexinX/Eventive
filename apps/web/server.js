import http from 'http';
import handler from 'serve-handler';

const {VITE_PORT} = process.env;

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    public: 'dist',
  });
});

server.listen(VITE_PORT);
/* eslint-disable no-console */
const express = require('express');
const next = require('next');

const devProxy = {
  '/member-request': {
    target: 'https://member-request.48ix.workers.dev/',
    changeOrigin: true,
  },
  '/mailing-list': {
    target: 'https://mailing-list.48ix.workers.dev/',
    changeOrigin: true,
  },
  '/invite-request': {
    target: 'https://invite-request.48ix.workers.dev/',
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV || 'development';
const dev = env !== 'production';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.info(`> Listening at http://localhost:${port} [${env}]`);
    });
  })
  .catch(err => {
    console.error('An error occurred, unable to start the server');
    console.error(err);
  });

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://3.35.82.134:8000',
      changeOrigin: true,
    })
  );
};
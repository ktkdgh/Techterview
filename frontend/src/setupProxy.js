const { createProxyMiddleware } = require('http-proxy-middleware');
import url from "./components/shared/url"

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: url.BASE_URL,
      changeOrigin: true,
    })
  );
};
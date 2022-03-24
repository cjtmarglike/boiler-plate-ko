const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    //'/api'로 요청이 오면 target을 아래와 같이 주겠다 
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
};
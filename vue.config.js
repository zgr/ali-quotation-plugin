const path = require('path');
module.exports = {
    devServer: {
        host: 'dev.daydao.com',
        port: 9600,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8081/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    lintOnSave: false //关闭eslint
}
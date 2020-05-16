module.exports = {
    // 反向代理
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            // 配置跨域
            '/api': {
                target: 'https://vuets-api.herokuapp.com',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        before: app => {}
    }
}
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
//const staticPath = 'static/zhaopin_daydao_com/video_interview_extension';
//const staticDomain = '//static-ai.daydao.com/';

module.exports = {
    //outputDir: 'dist/' + staticPath,
    //indexPath: '../../../views/zhaopin_daydao_com/video_interview_extension/index.html',
    //publicPath: process.env.NODE_ENV === 'production' ? staticDomain + staticPath + '/' : '/',
    outputDir: 'dist',
    publicPath:'./',
    productionSourceMap: false,
    filenameHashing: false,
    devServer: {
        host: 'dev.daydao.com',
        port: 9090,
        disableHostCheck:true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },

    configureWebpack: config => {
        // config.resolve.alias['element-ui'] = 'daydao-fed-common-element-ui';
        config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js';
        config.plugins.push(
            //解决moment打包的时候把所有的语言都打包进去的问题
            new webpack.ContextReplacementPlugin(
                /moment[\\/]locale$/,
                /^\.\/(zh-cn)$/
            )
        )

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true; //去掉console
            config.plugins.push(
                //清理目录
                new CleanWebpackPlugin(['dist'], {
                    root: path.resolve(__dirname, './'),
                    verbose: true
                })
            )
        }
    },

    css: {
        extract: true,
        loaderOptions: {
            sass: {
                //prependData: '@import "@/styles/var.scss";'
            }
        }
    }

   /* css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/style/var.scss";'
            }
        }
    }*/
}

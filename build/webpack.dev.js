// 开发环境配置
// 开发环境配置代码在webpack.dev.js中,需要借助 webpack-dev-server在开发环境启动服务器来辅助开发,
// 还需要依赖webpack-merge来合并基本配置

// webpack.dev.js
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  // process.env.NODE_ENV环境变量webpack会自动根据设置的mode字段来给业务代码注入对应的development和prodction (可在业务代码中直接访问process.env.NODE_ENV)
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 3006, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新 (在webpack4中,还需要在插件中添加了HotModuleReplacementPlugin,在webpack5中,只要devServer.hot为true了,该插件就已经内置了) 现在开发模式下修改css和less文件，页面样式可以在不刷新浏览器的情况实时生效，因为此时样式都在style标签里面，style-loader做了替换样式的热替换功能。但是修改App.tsx,浏览器会自动刷新后再显示修改后的内容,所以需要配置一些插件来实现不刷新就更新
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, '../public'), // 托管静态资源public文件夹, 在开发环境使用[绝对路径]可以访问到public下的文件, 但打包构建时不做处理会访问不到,所以现在需要在打包配置文件webpack.prod.js中新增copy插件配置
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件(修改页面时不需要刷新浏览器即可更新页面)-还需依赖于react-refesh(需在babel-loader中配置)
  ],
});

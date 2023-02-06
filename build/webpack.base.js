// 公共配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 配置入口文件
  entry: path.join(__dirname, '../src/index.tsx'),
  // 配置出口文件
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/', // 打包后文件的公共路径前缀
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        // babel-loader的配置抽离出去了, 自动读取babel.config.js中的配置
        use: 'babel-loader',
      },
      // 如果node_moduels中也有要处理的语法，可以把js|jsx文件配置加上
      // {
      //  test: /.(js|jsx)$/,
      //  use: 'babel-loader'
      // }
      {
        test: /.(css|less)$/,
        // 匹配到css文件后先用css-loader解析css, 最后借助style-loader把css插入到头部style标签中。
        use: [
          'style-loader',
          'css-loader',
          // 样式添加浏览器前缀
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer'],
          //     },
          //   },
          // },
          'postcss-loader', // 配置自动读取postcss.config.js
          'less-loader',
        ],
        // 或者写成
        // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      // 处理图片文件
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
      // 处理字体和媒体文件
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: 'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    // extensions是webpack的resolve解析配置下的选项，
    // 在引入模块时不带文件后缀时，会来该配置数组里面依次添加后缀查找文件，
    // 因为ts不支持引入以 .ts, tsx为后缀的文件，所以要在extensions中配置，而第三方库里面很多引入js文件没有带后缀，所以也要配置下js
    extensions: ['.js', '.tsx', '.ts'], // ['js', 'tsx', 'ts'] 这样写会报错 识别不到第三方js文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    // webpack.DefinePlugin 这是一个定义全局变量的插件, 允许创建一个在编译时可以配置的全局常量
    // 定义的变量可以在webpack打包范围内任意javascript环境内访问,甚至在项目根目录之外的js里也可以使用(前提是这个js被项目引用)!
    // 配置后会把值注入到业务代码里面去,webpack解析代码匹配到process.env.BASE_ENV,就会设置到对应的值
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      // 举例
      // BASE_ENV_IS_TEST: process.env.BASE_ENV === 'test',
      // PRODUCTION: JSON.stringify(true),
      // VERSION: JSON.stringify('5fa3b9'),
      // BROWSER_SUPPORTS_HTML5: true,
      // TWO: '1+1',
      // 'typeof window': JSON.stringify('object'),
    }),
  ],
};

// ...
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('BASE_ENV', process.env.BASE_ENV);

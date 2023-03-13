##### 打包后的 dist 文件可以在本地借助 node 服务器 serve 打开,全局安装 serve

`npm i serve -g`

##### 然后在项目根目录命令行执行 serve -s dist,就可以启动打包后的项目了

##### 区分环境

`区分开发模式还是打包构建模式可以用process.env.NODE_ENV,因为很多第三方包里面判断都是采用的这个环境变量。`
`区分项目接口环境可以自定义一个环境变量process.env.BASE_ENV,设置环境变量可以借助cross-env和webpack.DefinePlugin来设置。`
`cross-env：兼容各系统的设置环境变量的包`
`webpack.DefinePlugin：webpack内置的插件,可以为业务代码注入环境变量`

#### loaders

`style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)`
`css-loader: 解析css文件代码`
`less-loader: 解析less文件代码,把less编译为css`
`less: less核心`
`postcss-loader：处理css时自动加前缀`
`autoprefixer：决定添加哪些浏览器前缀到css中`
`babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5`
`@babel/corer: babel 编译的核心包`
`@babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法`
`core-js: 使用低版本js语法模拟高版本的库,也就是垫片`

#### 复制 public 文件夹

`一般public文件夹都会放一些静态资源,可以直接根据绝对路径引入,比如图片,css,js文件等,不需要webpack进行解析,只需要打包的时候把public下内容复制到构建出口文件夹中,可以借助copy-webpack-plugin插件`

#### 处理图片文件

`webpack4使用file-loader和url-loader来处理的`
`webpack5使用asset-module来处理`

#### 处理字体和媒体文件

`字体文件和媒体文件这两种资源处理方式和处理图片是一样的,只需要把匹配的路径和打包后放置的路径修改一下就可以了`

#### 在不刷新浏览器的前提下热更新(比如修改 App.tsx, 不需要刷新浏览器就可以自动更新)

`@pmmmwh/react-refresh-webpack-plugin 依赖于react-refresh`

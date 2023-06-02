// postcss.config.js是postcss-loader的配置文件,会自动读取配置
// 配置完成后 可在根目录创建.browserslistrc文件, 让postcss-loader知道要加哪些浏览器的前缀
module.exports = {
  plugins: ['autoprefixer'],
};

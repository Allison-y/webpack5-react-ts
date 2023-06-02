import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}

console.log('NODE_ENV', process.env.NODE_ENV);
// BASE_ENV 需在webpack.base.js中配置
// new webpack.DefinePlugin({
//   'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
// }),
// console.log('BASE_ENV', process.env.BASE_ENV);
// console.log('BASE_ENV_IS_TEST', BASE_ENV_IS_TEST);

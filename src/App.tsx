import React from 'react';
import smallImg from './assets/imgs/small.png';
import bigImg from './assets/imgs/large.jpg';
import './app.css';
import './app.less';

function App() {
  return (
    <>
      <img src={smallImg} alt="小于10kb的图片" />
      <img src={bigImg} alt="大于于10kb的图片" />
      {/* css中的背景图片一样也可以解析 */}
      <div className="smallImg"></div> {/* 小图片背景容器 */}
      <div className="bigImg"></div> {/* 大图片背景容器 */}
    </>
  );
}

export default App;

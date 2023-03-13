import React, { useState } from 'react';
import './app.css';
import './app.less';

function App() {
  const [count, setCount] = useState('');
  const onChange = (e: any) => {
    setCount(e.target.value);
  };

  return (
    // <>
    //   <img src={smallImg} alt="小于10kb的图片" />
    //   <img src={bigImg} alt="大于于10kb的图片" />
    //   {/* css中的背景图片一样也可以解析 */}
    //   <div className="smallImg"></div> {/* 小图片背景容器 */}
    //   <div className="bigImg"></div> {/* 大图片背景容器 */}
    // </>
    <>
      <p>2222288888</p>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    </>
  );
}

export default App;

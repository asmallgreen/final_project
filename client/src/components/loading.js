import React from 'react';
// import styles from './Loading.module.css';
// import YourLogo from './your-logo.png';

const Loading = () => {
  return (
    <div className='loadingContainer'>
    <div className='topBackground'></div>
      <div className='loadingContent expand'>
        <img src='/logo_1.png' alt="良弓logo" className='logo'/>
      </div>
      <div className='bottomBackground'></div>
    </div>
  );
};

export default Loading;
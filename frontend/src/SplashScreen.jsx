import React, { useEffect } from 'react';
import './App.css';
import logo from './assets/HouseMate logo.png';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // Show splash for 2 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="HouseMate Logo" className="splash-logo" />
      <h1 className="splash-title">Welcome to HouseMate</h1>
      <div className="splash-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

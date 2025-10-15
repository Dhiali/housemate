
import { useState } from 'react';
import './App.css';
import AuthApp from './Auth/src/App.jsx';
import './Auth/src/index.css';
import SplashScreen from './SplashScreen.jsx';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div style={{ display: showSplash ? 'none' : 'block' }}>
        <AuthApp />
      </div>
    </>
  );
}

export default App;


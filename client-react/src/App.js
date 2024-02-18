import React from 'react';
import AppRouter from './components/AppRouter';
import './index.css';

const App = () => {
  return (
    <div className="bg-blue-200">
        <AppRouter production={process.env.REACT_APP_PRODUCTION}/>
    </div>
  )
}

export default App;
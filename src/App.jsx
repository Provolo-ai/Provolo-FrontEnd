import React from 'react';
import PortfolioOptimizer from './pages/Optimizer';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './Reusables/Header';
import Error from './pages/Error';
import { SpeedInsights } from "@vercel/speed-insights/next"



const App = () => {
  const location = useLocation(); // 👈 Get current route path

  return (
    <div>
      <SpeedInsights/>
      {/* Show Header unless we're on /optimiser */}
      {location.pathname !== '/optimiser' && <Header />}

      {/* BETA v1.0 badge */}
      
    </div>
  );
};

export default App;
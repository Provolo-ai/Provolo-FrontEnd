import React from 'react';
import PortfolioOptimizer from './pages/PortfolioOptimizer';
import Home from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Header from './Reusables/Header';
import Error from './pages/Error';



const App = () => {
  const location = useLocation(); // 👈 Get current route path

  return (
    <div>
      {/* Show Header unless we're on /optimiser */}
      {location.pathname !== '/optimiser' && <Header />}

      {/* BETA v1.0 badge */}
      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset fixed top-7 right-5">
        BETA v1.0
      </span>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/optimiser' element={<PortfolioOptimizer />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
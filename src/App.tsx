import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header';
import { FlightSearchProvider } from './context/FlightSearchContext';
import CabinSelection from './pages/CabinSelection/CabinSelection';
import FlightList from './pages/FlightList/FlightList';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <FlightSearchProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-flightbg">
          <Header />
          <div className="max-w-7xl mx-auto w-full px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flights" element={<FlightList />} />
              <Route path="/cabin-selection" element={<CabinSelection />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </FlightSearchProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Header } from './components';
import { FlightSearchProvider } from './context';
import { CabinSelection, FlightList, Home } from './pages';

const App: React.FC = () => {
  return (
    <FlightSearchProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <div className="mx-auto w-full">
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

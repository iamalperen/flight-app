import React from 'react';

import { FlightSearchForm, PopularRoutes } from '../../components';
import { useFlightSearchForm } from '../../hooks/useFlightSearchForm';

const Home: React.FC = () => {
  const form = useFlightSearchForm();

  const handlePopularRouteSelect = (from: string, to: string) => {
    const fromCity = form.fromOptions.find(opt => opt.value === from) || null;
    const toOptions = form.toOptions;
    const toCity = toOptions.find(opt => opt.value === to) || null;
    form.setFromAndTo(fromCity, toCity);
  };

  return (
    <div
      data-testid="home-page"
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 bg-flightdark"
    >
      <div data-testid="home-content" className="flex flex-col items-center mt-12 w-full max-w-4xl">
        <h2 data-testid="home-greeting" className="text-white text-2xl font-light mb-1">
          Merhaba
        </h2>
        <p data-testid="home-subtitle" className="text-gray-200 mb-6">
          Nereyi keşfetmek istersiniz?
        </p>
        <FlightSearchForm
          data-testid="home-flight-search-form"
          from={form.from}
          to={form.to}
          passengers={form.passengers}
          fromOptions={form.fromOptions}
          toOptions={form.toOptions}
          loading={form.loading}
          onFromChange={form.setFrom}
          onToChange={form.setTo}
          onPassengersChange={form.setPassenger}
          onSubmit={form.handleSubmit}
        />
        <PopularRoutes
          data-testid="home-popular-routes"
          routes={form.popularRoutes}
          onSelect={handlePopularRouteSelect}
        />
      </div>
    </div>
  );
};

export default Home;

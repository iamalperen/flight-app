import React from 'react';

export interface PopularRoute {
  label: string;
  value: string;
  price?: number;
  times?: string[];
}

interface PopularRoutesProps {
  routes: PopularRoute[];
  onSelect: (from: string, to: string) => void;
}

const PopularRoutes: React.FC<PopularRoutesProps> = ({ routes, onSelect }) => {
  if (!routes.length) return null;
  return (
    <div data-testid="popular-routes" className="mt-8 w-full">
      <h3 data-testid="popular-routes-title" className="text-white text-lg mb-4">Popüler Rotalar</h3>
      <div data-testid="popular-routes-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routes.map(route => {
          const [fromCode, toCode] = route.value.split('-');
          return (
            <button
              key={route.value}
              data-testid={`popular-route-${route.value}`}
              className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelect(fromCode, toCode)}
              tabIndex={0}
            >
              <div className="font-semibold text-gray-800 text-left">{route.label}</div>
              {route.price && (
                <div data-testid={`popular-route-price-${route.value}`} className="mt-2 flex items-center text-sm text-gray-600">
                  <span>En düşük {route.price} TL</span>
                </div>
              )}
              {route.times && (
                <div data-testid={`popular-route-times-${route.value}`} className="mt-1 flex items-center text-sm text-gray-600">
                  <span>{route.times[0]}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PopularRoutes;

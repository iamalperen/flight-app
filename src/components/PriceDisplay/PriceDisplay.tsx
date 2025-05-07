import React from 'react';

interface PriceDisplayProps {
  amount: number;
  currency: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ amount, currency }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('tr-TR');
  };

  return (
    <div
      className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6"
      data-testid="price-display-container"
    >
      <div className="text-gray-600" data-testid="price-display-label">
        Toplam tutar
      </div>
      <div className="text-blue-600 font-medium text-2xl" data-testid="price-display-amount">
        {currency} {formatPrice(amount)}
      </div>
    </div>
  );
};

export default PriceDisplay;

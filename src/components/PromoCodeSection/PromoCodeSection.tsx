import React from 'react';

interface PromoCodeSectionProps {
  promoCodeActive: boolean;
  onTogglePromo: () => void;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({ promoCodeActive, onTogglePromo }) => {
  return (
    <>
      <div
        className="mb-6 bg-white p-4 rounded-md shadow-md flex items-center justify-between"
        data-testid="promo-section"
      >
        <label
          htmlFor="promoCodeTogglePresentational"
          className="text-sm font-medium text-gray-700 select-none"
          data-testid="promo-label"
        >
          Promosyon Kodu
        </label>
        <button
          id="promoCodeTogglePresentational"
          onClick={onTogglePromo}
          className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${promoCodeActive ? 'bg-red-600' : 'bg-gray-300'}`}
          role="switch"
          aria-checked={promoCodeActive}
          data-testid="promo-toggle"
        >
          <span className="sr-only">Promosyon Kodunu Aktifleştir</span>
          <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${promoCodeActive ? 'translate-x-6' : 'translate-x-1'}`}
            data-testid="toggle-slider"
          />
        </button>
      </div>
      {promoCodeActive && (
        <div
          className="mb-6 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded-md text-sm shadow-sm"
          data-testid="promo-info-banner"
        >
          <p data-testid="promo-info-text">
            Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini %50 indirimle satın
            alabilirsiniz!
          </p>
          <p className="mt-1" data-testid="promo-info-restriction">
            Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim yapılamamaktadır.
          </p>
        </div>
      )}
    </>
  );
};

export default PromoCodeSection;

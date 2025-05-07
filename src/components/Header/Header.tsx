import React from 'react';
import { Link } from 'react-router-dom';

import { useFlightSearch } from '../../context';

const Header: React.FC = () => {
  const { headerVariant } = useFlightSearch();
  const isDark = headerVariant === 'dark';

  return (
    <header
      data-testid="header"
      className={`w-full py-4 px-6 flex items-center justify-between transition-colors duration-300 ${
        isDark ? 'bg-[#063048]' : 'bg-white'
      }`}
    >
      <div
        data-testid="header-container"
        className={`flex items-center justify-between w-full max-w-7xl mx-auto border-b pb-2 ${
          isDark ? 'border-white' : 'border-black'
        }`}
      >
        <Link
          data-testid="header-logo"
          to="/"
          className={isDark ? 'text-white font-light text-sm' : 'text-gray-900 font-light text-sm'}
        >
          turkishairlines.com
        </Link>
        <span
          data-testid="header-title"
          className={isDark ? 'text-white font-light text-sm' : 'text-gray-900 font-light text-sm'}
        >
          search<span className="font-bold">Flight Challenge</span>
        </span>
      </div>
    </header>
  );
};

export default Header;

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { FareStatus } from '../../types';

interface StatusIconProps {
  status: FareStatus;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const isSuccess = status === 'AVAILABLE';

  return (
    <div className="flex justify-center mb-6" data-testid="status-icon-container">
      {isSuccess ? (
        <div
          className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center"
          data-testid="success-icon-container"
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="text-green-500 text-2xl"
            data-testid="success-icon"
          />
        </div>
      ) : (
        <div
          className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center"
          data-testid="error-icon-container"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="text-red-500 text-2xl"
            data-testid="error-icon"
          />
        </div>
      )}
    </div>
  );
};

export default StatusIcon;

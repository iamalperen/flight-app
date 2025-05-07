import React from 'react';

import { FareStatus } from '../../types';

interface StatusMessageProps {
  status: FareStatus;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status }) => {
  const message =
    status === 'AVAILABLE' ? 'Kabin seçiminiz tamamlandı.' : 'Kabin seçiminiz tamamlanamadı.';

  return (
    <div className="text-center mb-8" data-testid="status-message-container">
      <h2 className="text-lg font-medium text-gray-700" data-testid="status-message-text">
        {message}
      </h2>
    </div>
  );
};

export default StatusMessage;

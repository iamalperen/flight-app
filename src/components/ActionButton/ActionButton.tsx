import React from 'react';

import { ButtonColor } from '../../types';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: ButtonColor;
  'data-testid'?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  color = 'red',
  'data-testid': testId,
}) => {
  const baseClasses =
    'px-6 py-2 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[color]}`}
      data-testid={testId || 'action-button'}
    >
      {label}
    </button>
  );
};

export default ActionButton;

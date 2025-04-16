import React from 'react';
import './AlertMessage.css';

interface AlertMessageProps {
  message: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-warning" role="alert">
      {message}
    </div>
  );
};

export default AlertMessage;

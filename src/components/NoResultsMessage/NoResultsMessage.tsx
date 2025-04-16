import React from 'react';
import './NoResultsMessage.css';
const NoResultsMessage: React.FC = () => {
  return (
    <div className="no-results">
      <p>No se encontraron resultados. Intenta con otra búsqueda.</p>
    </div>
  );
};

export default NoResultsMessage;

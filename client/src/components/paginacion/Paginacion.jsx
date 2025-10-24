import React from 'react';
import './Paginacion.css';

const Paginacion = ({ currentPage, totalPaginas, onPageChange }) => {
  return (
    <div className="paginacion">
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={num === currentPage ? 'active' : ''}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Paginacion;
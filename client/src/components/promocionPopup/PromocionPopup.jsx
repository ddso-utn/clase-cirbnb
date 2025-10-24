import React from "react";
import "./PromocionPopup.css";

const PromocionPopup = ({ mensaje, onClose }) => {
  if (!mensaje) return null; // si no hay promoción, no muestra nada

  return (
    <div className="popup-overlay">
      <div className="popup-contenido">
        <p>{mensaje}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PromocionPopup;
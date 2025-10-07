import React, { useState } from "react";
import "./HotelCarousel.css";
import { hoteles } from "../../mockdata/Hoteles";

export default function HotelCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;

  const siguiente = () => {
    if (index < hoteles.length - visible) setIndex(index + 1);
  };

  const anterior = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (!Array.isArray(hoteles) || hoteles.length === 0) {
    return <p className="carousel-empty">No hay hoteles disponibles</p>;
  }

  return (

    
    <div className="carousel-container">
      <h2 className="carousel-title">Ofertas para el fin de semana</h2>

      <div className="carousel-wrapper">
        <div className="carousel-viewport">
          <div className="carousel-track"
          style={{
              transform: `translateX(-${index * (100 / visible)}%)`,
            }}>
            {hoteles.map((hotel) => (
              <div key={hotel.id} className="carousel-card">
                <div className="hotel-card">
                  <img
                    src={hotel.imagen}
                    alt={hotel.nombre}
                    className="hotel-image"
                  />
                  <div className="hotel-info">
                    <h3 className="hotel-name">{hotel.nombre}</h3>
                    <p className="hotel-location">{hotel.provincia}</p>
                    <div className="hotel-details">
                      <span className="hotel-score">{hotel.puntaje}</span>
                      <span className="hotel-price">
                       desde: ${hotel.precio.toLocaleString("es-AR")} / noche
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={anterior}
          disabled={index === 0}
          className={`carousel-btn left-btn ${
            index === 0 ? "disabled" : ""
          }`}
        >
          ◀
        </button>

        <button
          onClick={siguiente}
          disabled={index >= hoteles.length - visible}
          className={`carousel-btn right-btn ${
            index >= hoteles.length - visible ? "disabled" : ""
          }`}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
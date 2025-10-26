import { useParams } from "react-router-dom";
import { hoteles } from '../../mockdata/Hoteles';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from '@mui/material';
import {useCartContext} from "../../store/CartContext.jsx"
import "./HotelDetailPage.css"
import { getHotelById } from "../../api/api.js";

const conHabitaciones = (cantidadHabitaciones, hotel) => ({...hotel, cantidadHabitaciones})
const HotelDetailPage = ({ carrito, actualizarCarrito }) => {
const {agregarAlojamientoConCantidad} = useCartContext();
  const navigate = useNavigate()
  const { id } = useParams();
  
  // Acá lo busco en el front, pero debería pedirlo en el back
  //const hotel = hoteles.find(h => h.id === parseInt(id));

  const [hotel, setHotel] = useState(null);
  useEffect(() => {
    const cargarHotel = async () => {
        const data = await getHotelById(id); // llamada al backend
        setHotel(data);
    };
    cargarHotel();
  }, [id]);

  const [habitaciones, setHabitaciones] = useState(1);

  useEffect(() => {
    setHabitaciones(1);
  }, [id, carrito]);
  
  const incrementarHabitaciones = () => {
    const nuevasHabitaciones = habitaciones + 1;
    setHabitaciones(nuevasHabitaciones);
  };
  
  const decrementarHabitaciones = () => {
    if (habitaciones > 0) {
      const nuevasHabitaciones = habitaciones - 1;
      setHabitaciones(nuevasHabitaciones);
    }
  };

  const reservar = () => {
    agregarAlojamientoConCantidad(hotel, habitaciones)
    actualizarCarrito(conHabitaciones(habitaciones, hotel))  
    navigate("/")
  }

  if (!hotel) {
    return (
      <div className="hotel-detail-container">
        <div className="hotel-header">
          <h1>Hotel no encontrado</h1>
          <p>Lo sentimos, no pudimos encontrar el hotel que buscas.</p>
        </div>
      </div>
    );
  } 

  return (
    <div className="hotel-detail-container">
      <div className="hotel-header">
        <h1 className="hotel-nombre">{hotel.nombre}</h1>
        <div className="hotel-ubicacion">{hotel.ubicacion}</div>
      </div>

      <div className="hotel-content">
        <div className="hotel-image-section">
          <img 
            src={hotel.imagen} 
            alt={hotel.nombre} 
            className="hotel-imagen"
          />
        </div>

        <div className="hotel-info-section">
          <div className="hotel-description">
            {hotel.descripcion}
          </div>

          <div className="hotel-price-section">
            <div className="hotel-precio">$ {hotel.precio?.toLocaleString()}</div>
            <div className="price-details">Impuestos incluidos</div>        
          </div>

          <div className="hotel-rating-section">
            <div className="hotel-puntaje">{hotel.puntaje}</div>
            <div className="rating-text">Excelente</div>
          </div>
        </div>
      </div>

      <div className="points-section">
        Con esta reserva sumás puntos
      </div>
      
      <div className="reservar-container">
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={decrementarHabitaciones} disabled={habitaciones === 1}>-</Button>
          <Button disabled>{habitaciones}</Button>
          <Button onClick={incrementarHabitaciones}>+</Button>
        </ButtonGroup>
        <button className="reservar" onClick={reservar}>Reservar</button>
      </div>
    </div>
  );
};
export default HotelDetailPage;


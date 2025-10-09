import "./CarouselItem.css";
import { Link } from "react-router-dom";   
import "../../index.css"

const CarouselItem = ({hotel}) => {
  return (
    <div key={hotel.id} className="carousel-card">
      <div className="hotel-card">
        <img
          src={hotel.imagen}
          alt={hotel.nombre}
          className="hotel-image"
        />
        <div className="hotel-info">
          <h3 className="hotel-name">{hotel.nombre}</h3>
          <p className="hotel-location">{hotel.ubicacion}</p>
          <div className="hotel-details">
            <span className="hotel-score">{hotel.puntaje}</span>
            <span className="hotel-price">
              desde: ${hotel.precio.toLocaleString("es-AR")} / noche
            </span>
          </div>
          <div className="ver-detalles-container">
            <span className="ver-detalles">
              <Link to={`/hotels/${hotel.id}`} className="link-no-style">Ver Detalles</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem

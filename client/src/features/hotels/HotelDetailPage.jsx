import { useParams } from "react-router-dom";
import { hoteles } from '../../mockdata/Hoteles';
import "./HotelDetailPage.css"

const HotelDetailPage = () => {
  const { id } = useParams();
  console.log(id);
  console.log(hoteles);
  const hotel = hoteles.find(h => h.id === parseInt(id));
  console.log(hotel);

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
            Desayuno buffet
          </div>

          <div className="hotel-price-section">
            <div className="hotel-precio">$ {hotel.precio?.toLocaleString()}</div>
            <div className="price-details">Impuestos incluidos</div>        
          </div>

          <div className="hotel-rating-section">
            <div className="hotel-puntaje">{hotel.puntaje}</div>
            <div className="rating-text">Excelente</div>
            <div className="rating-comments">Ver comentarios</div>
            <div className="rating-highlight">Otras personas destacaron: La ubicación</div>
          </div>
        </div>
      </div>

      <div className="points-section">
        Con esta reserva sumás puntos
      </div>
    </div>
  );
};
export default HotelDetailPage;


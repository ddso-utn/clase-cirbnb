import AccomodationSearchBar from "../../components/accommodationSearchBar/AccomodationSearchBar";
import HotelCarousel from "../../components/hotelCarousel/HotelCarousel";
import { getHotelsSlowly, getHotels, getPromocion } from "../../api/api.js";
import {Spinner} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import './Home.css'
import Paginacion from "../../components/paginacion/Paginacion";
import PromocionPopup from "../../components/promocionPopup/PromocionPopup";

const Home = () => {
    const [hoteles, setHoteles] = useState([]);
    const [hotelesFiltrados, setHotelesFiltrados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [promocion, setPromocion] = useState(null);
  
    const filtrarHoteles = (searchText) => {
      if (searchText.trim() === "") {
        setHotelesFiltrados(hoteles); // Mostrar todos
      } else {
        // Filtrar desde datos originales
        const filtered = hoteles.filter(hotel => 
          hotel.ubicacion.toLowerCase().includes(searchText.toLowerCase())
        );
        setHotelesFiltrados(filtered);
      }
    }

    const cargarHoteles = async (page = 1) => {
      const hotelesCargados = await getHotels(page);
      console.log("Hoteles cargados:", hotelesCargados);
      setHoteles(hotelesCargados.data);
      setHotelesFiltrados(hotelesCargados.data);
      setCurrentPage(page);
      setTotalPaginas(hotelesCargados.totalPaginas);
    }

     const verificarPromocion = async () => {
    try {
      const promo = await getPromocion();
      if (promo && promo.descripcion) {
        setPromocion(promo.descripcion);
      }
    } catch (error) {
      console.error("Error obteniendo promoción:", error);
    }
  };

    // Para que cuando se monte el componente los cargue
    useEffect(() => {
      cargarHoteles();

        // chequea el backend cada 30 segundos
      const intervalo = setInterval(verificarPromocion, 30000);

      // limpia el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalo);
    }, [])

    return (
      <>
        <div className="home-body">
          <AccomodationSearchBar filtrarHoteles={filtrarHoteles}></AccomodationSearchBar>
        </div>
        {!hoteles.length ? <div className="spinner">
          <Spinner/>
        </div> :
          <div>
          <HotelCarousel hoteles={hotelesFiltrados} />

          {totalPaginas >= 1 && (
            <Paginacion
              currentPage={currentPage}
              totalPaginas={totalPaginas}
              onPageChange={(page) => cargarHoteles(page)}
           />
          )}

          {/* POPUP de promoción */}
          <PromocionPopup
            mensaje={promocion}
            onClose={() => setPromocion(null)}
          />
        </div>
        }
      </>
    )
};

export default Home; 
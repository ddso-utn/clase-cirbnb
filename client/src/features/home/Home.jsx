import AccomodationSearchBar from "../../components/accommodationSearchBar/AccomodationSearchBar";
import HotelCarousel from "../../components/hotelCarousel/HotelCarousel";
import { getHotelsSlowly } from "../../service/hotelsService.js";
import {Spinner} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import './Home.css'

const Home = () => {
    const [hoteles, setHoteles] = useState([]);
    const [hotelesFiltrados, setHotelesFiltrados] = useState([]);

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

    const cargarHoteles = async () => {
      const hotelesCargados = await getHotelsSlowly();
      setHoteles(hotelesCargados)
      setHotelesFiltrados(hotelesCargados)
    }

    // Para que cuando se monte el componente los cargue
    useEffect(() => {
      cargarHoteles()
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
          </div>
        }
      </>
    )
};

export default Home; 
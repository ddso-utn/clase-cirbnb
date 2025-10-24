import {hoteles} from "../mockdata/Hoteles";
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL

export const getHotels = async (page) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/alojamiento?page=${page}`, {
  headers: {
    'Cache-Control': 'no-cache'
  }
});
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los hoteles", error);
    throw error;
  }
}

export const getHotelById = async (id) => {
  try{
    const response = await axios.get(`${API_BASE_URL}/alojamiento/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el hotel con id: ${id}:`, error);
    throw error;
  }
}

export const crearReserva = async (idHotel, Nombre, FechaInicio, FechaFin) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/reserva`, {
      diaInicio: FechaInicio,
      diaFin: FechaFin,
      nombreHuesped: Nombre,
      alojamiento: idHotel
    });
    return response.data;
  } catch (error) {
    console.error(`Error al crear la reserva para el hotel con id: ${idHotel}:`, error);
    throw error;
  } 
}

export const getPromocion = async () => {
  const response = await axios.get(`${API_BASE_URL}/notificacion`);
  return response.data.mensaje;
}


export const getHotelsSlowly = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(hoteles)
  }, 5000)
})


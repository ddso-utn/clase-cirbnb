import {hoteles} from "../mockdata/Hoteles";
import axios from 'axios';

export const getHotels = async () => {
  try{
    const response = await axios.get('/alojamiento');
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los hoteles", error);
    throw error;
  }
}

export const getHotelById = async (id) => {
  try{
    const response = await axios.get(`/alojamiento/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el hotel con id: ${id}:`, error);
    throw error;
  }
}

export const crearReserva = async (idHotel, Nombre, FechaInicio, FechaFin) => {
  try{
    const response = await axios.post(`/reserva`, {
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


export const getHotelsSlowly = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(hoteles)
  }, 5000)
})


import React, { useState } from 'react';
import { Card, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { crearReserva } from '../../api/api.js';

import './Checkout.css';

const Checkout = ({ carrito, limpiarCarrito }) => {
  const inicializarCampo = (requerido = true) => ({ valor: '', requerido });
  const navigate = useNavigate()

  const inicializarCampos = () => ({
    nombre: inicializarCampo(),
    segundoNombre: inicializarCampo(false),
    apellido: inicializarCampo(),
    email: inicializarCampo(),
    repetirEmail: inicializarCampo(),
    fechaEntrada: inicializarCampo(),
    fechaSalida: inicializarCampo()
  });

  const [campos, setCampos] = useState(inicializarCampos());

  const camposCompletos = Object.values(campos)
    .filter(campo => campo.requerido)
    .every(campo => campo.valor.trim() !== '');

  const setValorDe = (campo) => (event) => {
    setCampos(prev => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value }
    }));
  };

  const handleGuardar = async () => {

    const nombreCompleto = `${campos.nombre.valor} ${campos.segundoNombre.valor} ${campos.apellido.valor}`.trim();
  try {
     for (const hotel of carrito) {
      await crearReserva(
        hotel.id,
        nombreCompleto,
        campos.fechaEntrada.valor,
        campos.fechaSalida.valor
      );
    }

    alert('Reserva(s) guardada(s) exitosamente');
    limpiarCarrito();
    navigate("/");
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    alert('Hubo un error al guardar la reserva. Intenta nuevamente.');
  }
  };

  return (
    <div className="root">
      <Card className="form-container">
        <h3>Ya casi estamos...</h3>
        <div>
          {carrito.map((hotel, index) => (
            <div key={index}>
              {hotel.nombre}: {hotel.cantidadHabitaciones}
            </div>
          ))}
        </div>
        
        <form>
          <TextField
            label="Nombre"
            required
            fullWidth
            margin="normal"
            value={campos.nombre.valor}
            onChange={setValorDe('nombre')}
          />
          <TextField
            label="Segundo nombre"
            fullWidth
            margin="normal"
            value={campos.segundoNombre.valor}
            onChange={setValorDe('segundoNombre')}
          />
          <TextField
            label="Apellido"
            required
            fullWidth
            margin="normal"
            value={campos.apellido.valor}
            onChange={setValorDe('apellido')}
          />
          <TextField
            label="Email"
            required
            fullWidth
            margin="normal"
            type="email"
            value={campos.email.valor}
            onChange={setValorDe('email')}
          />
          <TextField
            label="Repetir Email"
            required
            fullWidth
            margin="normal"
            type="email"
            value={campos.repetirEmail.valor}
            onChange={setValorDe('repetirEmail')}
          />
          <TextField
            label="Fecha de entrada"
            required
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={campos.fechaEntrada.valor}
            onChange={setValorDe('fechaEntrada')}
          />
          <TextField
            label="Fecha de salida"
            required
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={campos.fechaSalida.valor}
            onChange={setValorDe('fechaSalida')}
          />
          <div className="actions">
            <Button onClick={() => {}}>Cancelar</Button>
            <Button 
              variant="contained" 
              disabled={!camposCompletos}
              onClick={handleGuardar}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Checkout;
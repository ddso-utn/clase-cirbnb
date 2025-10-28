import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { crearReserva } from '../../api/api.js';
import { useForm } from '../../hooks/useForm';
import {useCartContext} from '../../store/CartContext.jsx'

import './Checkout.css';

const initialValues = {
  nombre: "",
  segundoNombre: "",
  apellido: "",
  email: "",
  repetirEmail: ""
};

function validate(values) {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es obligatorio";
  if (!values.apellido) errors.apellido = "El apellido es obligatorio";
  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }
  if (!values.repetirEmail) {
    errors.repetirEmail = "Repetir email es obligatorio";
  } else if (values.email !== values.repetirEmail) {
    errors.repetirEmail = "Los emails no coinciden";
  }
  return errors;
}

const Checkout = () => {
  const {alojamientosDeseados, limpiarCarrito} = useCartContext()
  const navigate = useNavigate();
  
  const [alojamientosConFechas, setAlojamientosConFechas] = useState(
    alojamientosDeseados.map(alojamiento => ({
      ...alojamiento,
      fechaEntrada: "",
      fechaSalida: ""
    }))
  );

  const comprar = async () => {
    const nombreCompleto = `${values.nombre} + ${values.apellido}`
    for (const a of alojamientosConFechas) {
      console.log(a)
      await crearReserva(a.id, nombreCompleto, a.fechaEntrada, a.fechaSalida)
    }
  }

  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    showError,
    errors,
  } = useForm(initialValues, async (formValues) => {
    limpiarCarrito();
    alert('¡Datos guardados correctamente!');
    resetForm();
    navigate(-1);
  }, validate);

  const handleFechaChange = (index, campo, valor) => {
    setAlojamientosConFechas(prev => 
      prev.map((alojamiento, i) => 
        i === index 
          ? { ...alojamiento, [campo]: valor }
          : alojamiento
      )
    );
  };

  const fechasAlojamientosCompletas = alojamientosConFechas.every(
    alojamiento => alojamiento.fechaEntrada && alojamiento.fechaSalida
  );

  const camposCompletos =
    values.nombre &&
    values.apellido &&
    values.email &&
    values.repetirEmail &&
    fechasAlojamientosCompletas

  return (
    <div className="root">
      <Card className="form-container">
        <h3>Ya casi estamos...</h3>
        
        <div>
          <Typography variant="h6">Fechas por alojamiento</Typography>
          {alojamientosConFechas.map((alojamiento, index) => (
            <Card key={index} variant="outlined">
              <Typography variant="subtitle1">
                {alojamiento.nombre}: {alojamiento.cantidadHabitaciones}
              </Typography>
              
              <TextField
                value={alojamiento.fechaEntrada}
                onChange={(e) => handleFechaChange(index, 'fechaEntrada', e.target.value)}
                type="date"
                fullWidth
                variant="standard"
                label="Fecha de entrada"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: ""
                }}
              />
              <TextField
                value={alojamiento.fechaSalida}
                onChange={(e) => handleFechaChange(index, 'fechaSalida', e.target.value)}
                type="date"
                fullWidth
                variant="standard"
                label="Fecha de salida"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  placeholder: ""
                }}
              />
            </Card>
          ))}
        </div>

        <Divider />
        
        <form onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            variant="standard"
            label="Nombre"
            error={Boolean(showError('nombre'))}
            helperText={showError('nombre')}
          />
          <TextField
            name="segundoNombre"
            value={values.segundoNombre}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            variant="standard"
            label="Segundo nombre"
          />
          <TextField
            name="apellido"
            value={values.apellido}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            variant="standard"
            label="Apellido"
            error={Boolean(showError('apellido'))}
            helperText={showError('apellido')}
          />
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            variant="standard"
            label="Email"
            error={Boolean(showError('email'))}
            helperText={showError('email')}
          />
          <TextField
            name="repetirEmail"
            value={values.repetirEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            variant="standard"
            label="Repetir Email"
            error={Boolean(showError('repetirEmail'))}
            helperText={showError('repetirEmail')}
          />
          <div className="actions">
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Cancelar
            </Button>
            <Button
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                !camposCompletos
              }
              variant="contained"
              type="submit"
              onClick={comprar}
            >
              Comprar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Checkout;

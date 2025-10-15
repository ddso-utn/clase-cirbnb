import React from 'react'
import { useState } from 'react';
import {Button, Card, TextField} from "@mui/material";

const Checkout = () => {
    const inicializarCampo = (requerido = true) => ({
        valor: "",
        requerido,
    })

    const inicializarCampos = () => ({
        nombre: inicializarCampo(),
        segundoNombre: inicializarCampo(false),
        apellido: inicializarCampo(),
        email: inicializarCampo(),
        repetirEmail: inicializarCampo()
    })
    
    const [campos, setCampos] = useState(inicializarCampos())

    const camposCompletos = Object.values(campos).every(campo =>
        !campo.requerido || campo.valor.length
    )

    const valorDe = (nombreCampo) => campos[nombreCampo].valor

    const setValorDe = (nombreCampo) => (e) => {
        const nuevoValor = e.target.value
        setCampos({
        ...campos,
        [nombreCampo]: {
            ...campos[nombreCampo],
            valor: nuevoValor
        }
        })
    }

    return (
        <div className="root">
        <Card className="form-container">
            <h1>Ya casi estamos...</h1>
            <form onSubmit={(e) => e.preventDefault()}>
            <TextField
                value={valorDe('nombre')}
                onChange={setValorDe('nombre')}
                fullWidth
                variant="standard"
                label="Nombre"
            />
            <TextField
                value={valorDe('segundoNombre')}
                onChange={setValorDe('segundoNombre')}
                fullWidth
                variant="standard"
                label="Segundo nombre"
            />
            <TextField
                value={valorDe('apellido')}
                onChange={setValorDe('apellido')}
                fullWidth
                variant="standard"
                label="Apellido"
            />
            <TextField
                value={valorDe('email')}
                onChange={setValorDe('email')}
                fullWidth
                variant="standard"
                label="Email"
            />
            <TextField
                value={valorDe('repetirEmail')}
                onChange={setValorDe('repetirEmail')}
                fullWidth
                variant="standard"
                label="Repetir Email"
            />
            <div className="actions">
                <Button variant="outlined" onClick={() =>{}}>Cancelar</Button>
                <Button disabled={!camposCompletos} variant="contained" onClick={() =>{}}>Guardar</Button>
            </div>
            </form>
        </Card>
        </div>
    )
}

export default Checkout

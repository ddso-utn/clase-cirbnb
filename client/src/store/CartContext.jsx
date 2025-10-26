import { createContext, useState, useContext } from "react";

// Crear contexto
const CartContext = createContext()

// usar el contexto en un wrapper
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [alojamientosDeseados, setAlojamientosDeseados] = useState([]);

    const removerAlojamiento = (alojamiento) => {
        setAlojamientosDeseados(prev => {
            const existing = prev.find(p => p.id === alojamiento.id);
            if (existing) {
                return prev.filter(a => a.id !== alojamiento.id);
            }
        });
    }
    const mostrarCarrito = () => setOpen(true);
    const esconderCarrito = () => setOpen(false);
    const agregarAlojamientoConCantidad = (alojamiento, cantidad) => {
        const quantity = Math.max(1, cantidad);
        // Queda fea porque, primero hay qeu ver si lo encontramos y después cambiarlo
        // Prev es el estado previo del estado, es una función especial
        // El estado lo manejo yo
        setAlojamientosDeseados(prev => {
            const existing = prev.find(p => p.id === alojamiento.id);
            if (existing) {
                console.log("Sumando una habitacion alojamiento: ", prev, quantity)
                return prev.map(p => p.id === alojamiento.id ? { ...p, cantidadHabitaciones: quantity } : p);
            }
            return [...prev, { ...alojamiento, cantidadHabitaciones: quantity }];
        });
    }

    return (
        <CartContext.Provider 
            value={
                { 
                    open, 
                    mostrarCarrito, 
                    esconderCarrito, 
                    alojamientosDeseados, 
                    agregarAlojamientoConCantidad,
                    removerAlojamiento
                }
            }
        >
            {children}    
        </CartContext.Provider>
    );
}

import { createContext, useState, useContext } from "react";

// Crear contexto
const CartContext = createContext()

// usar el contexto en un wrapper
export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [alojamientosDeseados, setAlojamientosDeseados] = useState([]);

    const mostrarCarrito = () => setOpen(true);
    const esconderCarrito = () => setOpen(false);
    const agregarAlojamientoConCantidad = (product, amount) => {
        const quantity = Math.max(0, product.cantidad + amount);
        // Queda fea porque, primero hay qeu ver si lo encontramos y después cambiarlo
        // Prev es el estado previo del estado, es una función especial
        // El estado lo manejo yo
        setAlojamientosDeseados(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, cantidad: quantity } : p);
            }
            return [...prev, { ...product, cantidad: quantity }];
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
                    agregarAlojamientoConCantidad
                }
            }
        >
            {children}    
        </CartContext.Provider>
    );
}

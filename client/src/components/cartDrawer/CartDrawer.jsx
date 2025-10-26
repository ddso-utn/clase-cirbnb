import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCartContext } from '../../store/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';

// TODO: Remove product
const CartDrawer = () => {
    const navigate = useNavigate();
    const { 
        open, 
        alojamientosDeseados, 
        esconderCarrito, 
        agregarAlojamientoConCantidad,
        removerAlojamiento 
    } = useCartContext();
    const [openModal, setOpenModal] = useState(false);
    const alojamientosFiltrados = alojamientosDeseados.filter(a => a.cantidadHabitaciones > 0);
    const comprar = () => setOpenModal(true);
    const total = alojamientosDeseados.reduce((sum, a) => sum + a.precio * a.cantidadHabitaciones, 0);

    return (
    <Drawer anchor="right" open={open} onClose={esconderCarrito}>
      <div className="cart-drawer-content">
        <h2>Carrito</h2>
        {alojamientosFiltrados.length === 0 ? (
          <p className="cart-empty">No hay productos en el carrito.</p>
        ) : (
          <div className="cart-list">
            {alojamientosFiltrados.map(a => (
              <div key={a.id} className="cart-item">
                <img src={a.imagen} alt={a.nombre} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{a.nombre}</div>
                  <div className="cart-item-price">${a.precio.toFixed(2)}</div>
                  <div className="cart-item-controls">
                    <IconButton size="small" onClick={() => agregarAlojamientoConCantidad(a, a.cantidadHabitaciones - 1)} disabled={a.cantidadHabitaciones <= 1}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <span className="cart-item-qty">{a.cantidadHabitaciones}</span>
                    <IconButton size="small" onClick={() => agregarAlojamientoConCantidad(a, a.cantidadHabitaciones + 1)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
                <IconButton size="small" onClick={() => removerAlojamiento(a)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
        <div className="cart-total-section">
          <div className="cart-total-row">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            disabled={!alojamientosFiltrados.length}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 16 }}
            onClick={comprar}
          >
            Comprar
          </Button>
        </div>
      </div>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
                sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                minWidth: 300,
                textAlign: 'center'
                }}
            >
                <h2>¡Compra confirmada!</h2>
                <p>Ud. va a comprar: {alojamientosFiltrados.map(a => a.nombre).join(', ')}</p>
                <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setOpenModal(false);
                    navigate("/checkout");
                }}
                sx={{ mt: 2 }}
                >
                Ir a Checkout
                </Button>
            </Box>
        </Modal>
    </Drawer>
  );
}
export default CartDrawer;
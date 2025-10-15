import Home from './features/home/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout.jsx';
import HotelDetailPage from './features/hotels/HotelDetailPage.jsx';
import {createTheme, ThemeProvider} from "@mui/material"
import Checkout from './features/checkout/Checkout.jsx';
import React, {useState} from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: "#24044e"
    }
  }
})

function App() {
  const [carrito, setCarrito] = useState([]);

  const actualizarCarrito = (hotel) => {
    setCarrito([...carrito, hotel]);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout  carrito={carrito}/>} >
            <Route index element={<Home />} />
            <Route 
              path="/hotels/:id" 
              element={
                <HotelDetailPage
                  carrito={carrito}
                  actualizarCarrito={actualizarCarrito}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
              <Checkout 
                carrito={carrito}
                limpiarCarrito={limpiarCarrito}
              />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
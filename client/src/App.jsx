import Home from './features/home/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout.jsx';
import HotelDetailPage from './features/hotels/HotelDetailPage.jsx';
import {createTheme, ThemeProvider} from "@mui/material"

const theme = createTheme({
  palette: {
    primary: {
      main: "#24044e"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout  />} >
            <Route index element={<Home />} />
            <Route path="/hotels/:id" element={<HotelDetailPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
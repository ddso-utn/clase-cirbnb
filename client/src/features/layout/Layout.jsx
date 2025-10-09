import { Outlet } from "react-router";
import Header from "../../components/headers/Header.jsx";
import Navbar from "../../components/headers/Navbar.jsx";

const Layout = () => {
    return(
        <>
          <Header username="Alumno/a de DDSO"></Header>
          <Navbar></Navbar>
          <Outlet />
        </>
    )
}

export default Layout;
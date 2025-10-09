import { Outlet } from "react-router";
import Header from "../../components/header/Header.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";

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
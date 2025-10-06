import { Outlet } from "react-router";
import Header from "../../components/header/Header.js";
import Navbar from "../../components/navbar/Navbar.js";

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
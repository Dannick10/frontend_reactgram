import React from "react";
import "./Navbar.css";

//components
import { NavLink, Link } from "react-router-dom";
import {
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">ReactGram</Link>
      <form>
        <CiSearch />
        <input type="text" />
      </form>
      <ul id="nav-links">
        <NavLink to="/">
          <BsHouseDoorFill />
        </NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/register">Cadastrar</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

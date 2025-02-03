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
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
 
  return (
    <nav id="navbar">
      <Link to="/">ReactGram</Link>
      <ul id="nav-links">
        {auth ? (
          <>
            <form id="search-form">
              <CiSearch />
              <input type="text" />
            </form>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/profile">
              <BsFillPersonFill/>
              </NavLink>
            </li>
            <li>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

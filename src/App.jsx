import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/login";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./hooks/useAuth";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/profile/Profile";

// user 

function App() {

  const { auth, loading} = useAuth()

    if(loading) {
      return <p>Carregando</p>
    }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
        <Routes>
          <Route path="/" element={auth ?<Home /> : <Navigate to="/login"/>} />
          <Route path="/editprofile" element={auth ?<EditProfile /> : <Navigate to="/login"/>} />
          <Route path="/users/:id" element={auth ?<Profile /> : <Navigate to="/"/>} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/"/>} />
          <Route path="/register" element={!auth ?<Register /> : <Navigate to="/"/>} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

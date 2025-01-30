import React from "react";
import "./Auth.css";

//components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

//redux
import { register, reset } from "../../slices/authSlices";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [name, SetName] = useState();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [confirmPassowrd, SetconfirmPassword] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {

    e.preventDefault()

    const user = {
      name: name,
      email: email,
      password: password,
      confirmpassword: confirmPassowrd,
    };
    console.log(user);
    dispatch(register(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.auth);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassowrd}
          onChange={(e) => SetconfirmPassword(e.target.value)}
        />

        <input type="submit" placeholder="Cadastrar" />
      </form>
      <p>
        Já tem conta ? <Link to={"/login"}>Ir para o login</Link>
      </p>
    </div>
  );
};

export default Register;

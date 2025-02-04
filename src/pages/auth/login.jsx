import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, reset } from "../../slices/authSlices";
import Message from "../../components/Message";

const Login = () => {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(email)

    let user = {
      email: email,
      password: password,
    };

    console.log(user)

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

 
  const { loading, error } = useSelector((state) => state.auth);
  console.log({error})
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">entre para ver o que têm de novo.</p>
      <form onSubmit={handleLogin}>
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
        {!loading && <input type="submit" placeholder="entrar" />}
        {loading && <input type="submit" value={"Aguarde..."} disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        não tem conta ? <Link to={"/register"}>Ir para o registro</Link>
      </p>
    </div>
  );
};

export default Login;

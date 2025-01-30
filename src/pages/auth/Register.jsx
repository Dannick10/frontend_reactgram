import React from "react";
import "./Auth.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

const Register = () => {
  const registerSchema = z
    .object({
      name: z.string()
      .min(5, "O nome precisa ter no mínimo 5 caracteres"),
      email: z.string()
      .email("Digite um e-mail válido"),
      password: z.string()
      .min(5, "A senha precisa ter no mínimo 5 caracteres"),
      confirmpassword: z.string(),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "As senhas precisam ser iguais",
      path: ["confirmpassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onhandleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div id="register" onSubmit={handleSubmit(onhandleSubmit)}>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}

        <input type="password" placeholder="Senha" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}

        <input
          type="password"
          placeholder="Confirmar senha"
          {...register("confirmpassword")}
        />
        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}

        <input type="submit" placeholder="Cadastrar" />
      </form>
      <p>
        Já tem conta ? <Link to={"/login"}>Ir para o login</Link>
      </p>
    </div>
  );
};

export default Register;

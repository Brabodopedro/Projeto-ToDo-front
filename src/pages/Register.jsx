import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Usa instância com baseURL correta
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // ✅ Chamada correta para API Laravel
      await api.post("/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      // ✅ Redireciona para login após sucesso
      navigate("/login");
    } catch (err) {
      console.error("Erro no registro:", err);
      if (err.response?.status === 422) {
        setError("Dados inválidos ou e-mail já cadastrado.");
      } else {
        setError("Erro ao cadastrar. Verifique os dados.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirme a senha"
          value={form.password_confirmation}
          onChange={handleChange}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já tem conta? <a href="/login">Entrar</a>
      </p>
    </div>
  );
}

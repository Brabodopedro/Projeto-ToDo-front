import { useEffect, useState } from "react";
import axios from "axios";
import styles from './Account.module.css';

export default function AccountPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Carregando dados da conta...</p>;

  return (
    <div className={styles.container}>
      <h2>Minha Conta</h2>
      <p><strong>Nome:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Data de criação:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}

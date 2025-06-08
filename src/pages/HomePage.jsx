import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vindo ao Task Manager</h1>
      <p>Um sistema de gerenciamento de tarefas com autenticação JWT.</p>
      <Link to="/login">
        <button style={{ padding: "10px 20px", marginTop: "20px" }}>Fazer login</button>
      </Link>
    </div>
  );
}

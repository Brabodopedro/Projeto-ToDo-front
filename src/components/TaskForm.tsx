import { useState } from "react";
import axios from "axios";

interface Props {
  onTaskCreated: () => void;
  onCancel: () => void;
}

export default function TaskForm({ onTaskCreated, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pendente");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/tasks",
        {
          title,
          description,
          due_date: dueDate,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onTaskCreated(); // Atualiza a lista
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Tarefa</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendente">Pendente</option>
        <option value="concluída">Concluída</option>
        <option value="cancelada">Cancelada</option>
      </select>
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

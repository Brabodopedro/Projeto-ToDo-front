import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
}

interface Props {
  onSave: () => void;
  onClose: () => void;
  editingTask?: Task | null;
  inline?: boolean; // define se será embutido na tabela ou não
}

export default function TaskForm({ onSave, onClose, editingTask = null, inline = false }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pendente");

  // Preencher dados caso esteja editando
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.due_date);
      setStatus(editingTask.status);
    }
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (editingTask) {
        // Atualização
        await axios.put(
          `http://localhost:8000/api/tasks/${editingTask.id}`,
          { title, description, due_date: dueDate, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Criação
        await axios.post(
          "http://localhost:8000/api/tasks",
          { title, description, due_date: dueDate, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      onSave();
    } catch (err) {
      console.error("Erro ao salvar tarefa:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: inline ? 0 : "1rem" }}>
      {!inline && <h3>{editingTask ? "Editar Tarefa" : "Nova Tarefa"}</h3>}

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
      <button type="button" onClick={onClose}>Cancelar</button>
    </form>
  );
}

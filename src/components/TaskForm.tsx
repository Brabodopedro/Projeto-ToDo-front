import { useState } from "react";
import axios from "axios";
import styles from './TaskForm.module.css'; // <- novo CSS module

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

      // ✅ limpa os campos
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pendente");

      onTaskCreated(); // ✅ atualiza a lista e fecha o form
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
    }
  };

  const handleCancel = () => {
    // ✅ também limpa os campos ao cancelar
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("pendente");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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

      <div className={styles.buttons}>
        <button type="submit">Salvar</button>
        <button type="button" onClick={handleCancel} className={styles.cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

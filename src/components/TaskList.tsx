import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h2>Minhas Tarefas</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Fechar" : "+ Nova Tarefa"}
      </button>

      {showForm && (
        <TaskForm
          onTaskCreated={() => {
            fetchTasks();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} -{" "}
            <em>{task.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./TaskForm";
import styles from './TaskList.module.css';

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
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Buscar tarefas do usuário autenticado
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

  // Editar tarefa
  const handleEdit = (task: Task) => {
    if (editingTask?.id === task.id) {
      // Se já estiver editando essa mesma tarefa, fecha o form
      setEditingTask(null);
    } else {
      // Abre edição para a tarefa clicada
      setEditingTask(task);
      setShowForm(false); // garante que o form de criação esteja fechado
    }
  };
  // Excluir tarefa
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const toggleForm = () => {
    setEditingTask(null);  // limpa edição
    setShowForm(prev => !prev);
  };


  // Fechar formulário
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Após salvar (criar ou editar), fecha e atualiza
  const handleSaveTask = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Minhas Tarefas</h2>
      {!editingTask && (
        <button onClick={toggleForm} className={styles.edit}>+ Nova Tarefa</button>
      )}
      {showForm && !editingTask && (
        <TaskForm
          onSave={handleSaveTask}
          onClose={handleCloseForm}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <>
              <tr>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{new Date(task.due_date).toLocaleDateString()}</td>
                <td>
                  <button className={styles.edit} onClick={() => handleEdit(task)}>Editar</button>
                  <button className={styles.delete} onClick={() => handleDelete(task.id)}>Excluir</button>
                </td>
              </tr>

              {editingTask?.id === task.id && (
                <tr>
                  <td colSpan={5}>
                    <TaskForm
                      onSave={handleSaveTask}
                      onClose={handleCloseForm}
                      editingTask={editingTask}
                      inline
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>

      </table>
    </div>
  );
}

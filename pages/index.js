import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

/**
 * Home component representing the Advanced Todo App.
 *
 * This React functional component implements a Todo application that enables users
 * to add tasks, toggle their completion status, delete tasks, and filter them based on
 * their completion state. Tasks are persisted using localStorage and state is managed
 * using React hooks (useState and useEffect).
 *
 * Features:
 * - Adding tasks: Creates a new task with a unique ID, text (trimmed), selected category,
 *   and an initial incomplete status.
 * - Toggling task completion: Inverts the completion state of a task identified by its ID.
 * - Deleting tasks: Removes a task from the tasks list based on its ID.
 * - Filtering tasks: Displays tasks filtered by the current filter: 'all', 'completed', or 'incomplete'.
 *
 * React Hooks:
 * - useEffect: Loads tasks from localStorage on mount and saves tasks back whenever the tasks state changes.
 * - useState: Manages state for task input, category selection, tasks array, and filter criteria.
 *
 * @returns {JSX.Element} The rendered Todo App user interface.
 */
export default function Home() {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('General');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  // Load tasks from LocalStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to LocalStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      category,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'completed') return t.completed;
    if (filter === 'incomplete') return !t.completed;
    return true; // 'all'
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Advanced Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Advanced Todo App</h1>

        <div className={styles.form}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task..."
            className={styles.input}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
          <button onClick={addTask} className={styles.addButton}>
            Add Task
          </button>
        </div>

        <div className={styles.filters}>
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? styles.activeFilter : ''}
          >
            All
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? styles.activeFilter : ''}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            className={filter === 'incomplete' ? styles.activeFilter : ''}
          >
            Incomplete
          </button>
        </div>

        <ul className={styles.taskList}>
          {filteredTasks.map((t) => (
            <li key={t.id} className={`${styles.taskItem} ${t.completed ? styles.completed : ''}`}>
              <span>{t.text}</span>
              <span className={styles.categoryTag}>{t.category}</span>
              <div className={styles.actions}>
                <button onClick={() => toggleTaskCompletion(t.id)} className={styles.completeButton}>
                  {t.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(t.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
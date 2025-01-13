import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo App</h1>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className={styles.input}
          />
          <button onClick={addTask} className={styles.addButton}>
            Add
          </button>
        </div>

        <ul className={styles.taskList}>
          {tasks.map((task, index) => (
            <li key={index} className={styles.taskItem}>
              <span>{task}</span>
              <button onClick={() => removeTask(index)} className={styles.deleteButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
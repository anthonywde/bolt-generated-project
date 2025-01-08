import React, { useState, useEffect } from 'react';

    function App() {
      const [tasks, setTasks] = useState([]);
      const [newTask, setNewTask] = useState('');

      useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
      }, []);

      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);

      const addTask = () => {
        if (newTask.trim()) {
          setTasks([...tasks, { text: newTask, completed: false }]);
          setNewTask('');
        }
      };

      const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
          i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
      };

      const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      };

      return (
        <div>
          <h1>To-Do List</h1>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Add</button>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.text}
                </span>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;

import React, { createContext, useState, useContext } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksContextProvider = ({ children }) => {
    const initalTasks = [
        { id: 1, title: 'Complete React tutorial', done: false },
        { id: 2, title: 'Read about Context API', done: true },
        { id: 3, title: 'Build a small project', done: false },
        { id: 4, title: 'Review Redux for state management', done: false },
        { id: 5, title: 'Explore React Router for navigation', done: true },
        { id: 6, title: 'Learn about React Hooks', done: false },
        { id: 7, title: 'Investigate React performance optimization', done: false },
        { id: 8, title: 'Study advanced React patterns', done: false },
        { id: 9, title: 'Understand server-side rendering with React', done: false },
        { id: 10, title: 'Experiment with GraphQL and Apollo Client', done: false },
        { id: 11, title: 'Practice building custom hooks', done: true },
    ];

    const [tasks, setTasks] = useState(initalTasks);

    const addTask =(task) => {
        setTasks([...tasks, task]);
    }

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    return (
        <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
            {children}
        </TasksContext.Provider>
    );
};
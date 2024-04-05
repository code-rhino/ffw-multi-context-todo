# React - Multiple Context

[Video](https://vimeo.com/931251458/d31126c6cb?share=copy)

### **Prerequisites**
Before we start, make sure you have a basic understanding of React and have Node.js installed on your machine. You should be familiar with React components, props, state, and hooks.

### **Step 1: Setting Up Your React Application**

First, create a new React application using Create React App:

```bash
npx create-react-app task-manager
cd task-manager
```

### **Step 2: Creating the Task Context**

The Task Context will be responsible for managing tasks and their functionalities.

- **Create a Context**: Navigate to the `src` directory, create a folder named `contexts`, and inside it, create a file named `TasksContext.js`. Initialize your context here:

  ```javascript
  // src/contexts/TasksContext.js
  import React, { createContext, useContext, useState } from 'react';

  const TasksContext = createContext();

  export const useTasks = () => useContext(TasksContext);
  ```

- **Implement Task Provider**: The provider will wrap your components, allowing them to access tasks and task-related functions.

  ```javascript
  export const TasksContextProvider = ({ children }) => {
      const initialTasks = []; // Start with an empty array or pre-defined tasks
      const [tasks, setTasks] = useState(initialTasks);

      // Function to add a new task
      const addTask = task => setTasks(prevTasks => [...prevTasks, task]);

      // Function to remove a task by its id
      const removeTask = taskId => setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

      return (
          <TasksContext.Provider value={{ tasks, addTask, removeTask }}>
              {children}
          </TasksContext.Provider>
      );
  };
  ```

### **Step 3: Creating the Filter Context**

Similar to the Tasks Context, the Filter Context will manage the state for filtering tasks.

- **Create a Filter Context**: In the same `contexts` directory, create a `FilterContext.js` file and set up your context and provider.

  ```javascript
  // src/contexts/FilterContext.js
  import React, { createContext, useContext, useState } from 'react';

  const FilterContext = createContext();

  export const useFilter = () => useContext(FilterContext);

  export const FilterContextProvider = ({ children }) => {
      const [filter, setFilter] = useState('all'); // 'all', 'done', 'active'

      return (
          <FilterContext.Provider value={{ filter, setFilter }}>
              {children}
          </FilterContext.Provider>
      );
  };
  ```

### **Step 4: Building the TaskList Component**

The `TaskList` component will display the tasks. It will use the `useTasks` hook to access the tasks from the `TasksContext`.

- **Create the TaskList Component**: Inside the `src/components` directory, create a `TaskList.js` file.

  ```javascript
  // src/components/TaskList.js
  import React from 'react';
  import { useTasks } from '../contexts/TasksContext';
  import { useFilter } from '../contexts/FilterContext';

  const TaskList = () => {
      const { tasks } = useTasks();
      const { filter } = useFilter();

      const filteredTasks = tasks.filter(task => {
          if (filter === 'done') return task.done;
          if (filter === 'active') return !task.done;
          return true; // for 'all'
      });

      return (
          <ul>
              {filteredTasks.map(task => (
                  <li key={task.id}>{task.title} - {task.done ? 'Done' : 'Pending'}</li>
              ))}
          </ul>
      );
  };

  export default TaskList;
  ```

### **Step 5: Creating the FilterSelect Component**

This component will allow users to filter tasks based on their status.

- **Create FilterSelect Component**: In the `src/components` directory, create a `FilterSelect.js` file.

  ```javascript
  // src/components/FilterSelect.js
  import React from 'react';
  import { useFilter } from '../contexts/FilterContext';

  const FilterSelect = () => {
      const { filter, setFilter } = useFilter();

      return (
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="active">Active</option>
          </select>
      );
  };

  export default FilterSelect;
  ```

### **Step 6: Integrating Context Providers in the App Component**

Wrap your components with the context providers to grant

 them access to the context values.

- **Update the App Component**: Modify the `src/App.js` file to use the context providers and components you've created.

  ```javascript
  // src/App.js
  import React from 'react';
  import TaskList from './components/TaskList';
  import FilterSelect from './components/FilterSelect';
  import { TasksContextProvider } from './contexts/TasksContext';
  import { FilterContextProvider } from './contexts/FilterContext';

  function App() {
    return (
      <TasksContextProvider>
        <FilterContextProvider>
          <h1>Task Manager</h1>
          <FilterSelect />
          <TaskList />
        </FilterContextProvider>
      </TasksContextProvider>
    );
  }

  export default App;
  ```

### **Step 7: Running Your Application**

Now that you've set everything up, it's time to see your Task Manager in action.

- **Start the Application**: Run the following command in your terminal:

  ```bash
  npm start
  ```

This should open a new tab in your default browser displaying your Task Manager application. You can now add, remove, and filter tasks based on their completion status.

Congratulations! You've built a Task Manager application using React Context API for state management. This approach showcases how to effectively use React's Context API to manage and share state across different components, leading to cleaner and more maintainable code.
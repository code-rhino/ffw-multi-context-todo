import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import { TasksContextProvider } from './contexts/TasksContext';
import { FilterContextProvider } from './contexts/FilterContext';
import FilterSelect from './components/FilterSelect';

function App() {
  return (
    <TasksContextProvider>
      <FilterContextProvider>
      <h1>Task Manager</h1>
      <FilterSelect  />
      <TaskList />
      </FilterContextProvider>
    </TasksContextProvider>
  );
}

export default App;

import React from "react";
import { useTasks } from "../contexts/TasksContext";
import { useFilter } from "../contexts/FilterContext";
const TaskList = () => {

    const { tasks } = useTasks();
    const {filter} = useFilter();
    const filteredTasks = tasks.filter((task) => {
        if(filter === "done") {
            return task.done;
        }
        if(filter === "active") {
            return !task.done;
        }
        return true;
    });

    return(
        <ul>
            {filteredTasks.map(task => (
                <li key={task.id}>{task.title} - {task.done ? 'Done' : 'Pending'}</li>
            ))}
        </ul>
    );
};

export default TaskList;
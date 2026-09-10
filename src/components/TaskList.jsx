import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";

export const TaskList = ({
  tasks,
  filterMode,
  setComplete,
  editTask,
  deleteTask,
}) => {
  const visibleTasks = tasks.filter((task) => {
    if (filterMode === "active") return !task.isDone;
    if (filterMode === "complete") return task.isDone;
    return true;
  });
  return (
    <List>
      {visibleTasks.map((task) => {
        return (
          <TaskItem
            key={task.id}
            task={task}
            setComplete={setComplete}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </List>
  );
};

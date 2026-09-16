import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { filterTasks } from "../rtk/filterSelector";
import { loadTasks } from "../rtk/tasksSlice";

export const TaskList = () => {
  const tasks = useSelector(filterTasks);
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) dispatch(loadTasks(JSON.parse(savedTasks)));
    } catch (e) {
      console.error(e);
    }
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};

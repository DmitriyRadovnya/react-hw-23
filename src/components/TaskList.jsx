import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadTasks } from "../redux/actions";

export const TaskList = ({ filterMode }) => {
  const allTasks = useSelector((state) => state);
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
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
  }, [allTasks, hasLoaded]);

  const visibleTasks = allTasks.filter((task) => {
    if (filterMode === "active") return !task.isDone;
    if (filterMode === "complete") return task.isDone;
    return true;
  });
  return (
    <List>
      {visibleTasks.map((task) => {
        return <TaskItem key={task.id} task={task} />;
      })}
    </List>
  );
};

import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadTasks } from "../redux/actions";

export const TaskList = () => {
  const { allTasks, filterMode } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [hasLoaded, setHasLoaded] = useState(false);
  console.log(filterMode);

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

  return (
    <List>
      {allTasks.map(
        (task) => task.isVisible && <TaskItem key={task.id} task={task} />,
      )}
    </List>
  );
};

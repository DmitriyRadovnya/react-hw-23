import { List, Button } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../rtk/tasksSlice";
import { filterTasks } from "../rtk/filterSelector";

export const TaskList = () => {
  const {
    tasks,
    loading: { load },
    error,
  } = useSelector((state) => state.tasks);
  const filteredTasks = useSelector(filterTasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  if (error)
    return (
      <>
        <h2>{error}</h2>
        <Button
          variant="contained"
          onClick={() => dispatch(fetchTasks())}
          sx={{ textTransform: "none" }}
        >
          Повторить запрос
        </Button>
      </>
    );
  if (load) return <h2>Loading...</h2>;

  if (tasks.length === 0) return <h2>Добавьте вашу первую задачу</h2>;

  return (
    <List>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </List>
  );
};

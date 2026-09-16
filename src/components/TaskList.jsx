import { List, Button } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../rtk/tasksSlice";

export const TaskList = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
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

  if (tasks.length === 0) return <h2>Добавьте вашу первую задачу</h2>;

  return (
    <List>
      <Button
        variant="contained"
        onClick={() => dispatch(fetchTasks())}
        sx={{ textTransform: "none" }}
      >
        Обновить данные
      </Button>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </List>
  );
};

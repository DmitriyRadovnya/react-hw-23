import { List, Button } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasks } from "../redux/actions/apiActions";

export const TaskList = () => {
  const {
    api: { tasks, loading, error },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return (
      <>
        <h1>{error.message}</h1>{" "}
        <Button
          variant="contained"
          onClick={() => dispatch(getTasks())}
          sx={{ textTransform: "none" }}
        >
          Повторить запрос
        </Button>
      </>
    );

  return (
    <>
      <Button
        variant="contained"
        onClick={() => dispatch(getTasks())}
        sx={{ textTransform: "none" }}
      >
        Загрузить данные
      </Button>
      <List>
        {tasks && tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </List>
    </>
  );
};

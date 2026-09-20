import { CreateTask } from "./CreateTask";
import { TaskList } from "./TaskList";
import { FilterControl } from "./FilterControl";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../rtk/tasksSlice";

export function Todo() {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks.tasks);

  const clearCompleted = async () => {
    const tasksIdsForDelete = tasks
      .filter((task) => task.completed)
      .map((t) => t.id);
    await Promise.all(tasksIdsForDelete.map((id) => dispatch(deleteTask(id))));
  };

  return (
    <>
      <CreateTask />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FilterControl />
        <Button
          variant="contained"
          onClick={() => clearCompleted()}
          sx={{ textTransform: "none" }}
        >
          Удалить выполненные
        </Button>
      </Box>
      <TaskList />
    </>
  );
}

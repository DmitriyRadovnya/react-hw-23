import "./App.css";
import { Header } from "./components/Header";
import { CreateTask } from "./components/CreateTask";
import { TaskList } from "./components/TaskList";
import { FilterControl } from "./components/FilterControl";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCompleted } from "./rtk/tasksSlice";

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <Header />
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
          onClick={() => dispatch(clearCompleted())}
          sx={{ textTransform: "none" }}
        >
          Удалить выполненные
        </Button>
      </Box>
      <TaskList />
    </>
  );
}

export default App;

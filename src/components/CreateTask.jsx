import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { createTask } from "../rtk/tasksSlice";

export const CreateTask = () => {
  const dispatch = useDispatch();
  const { create } = useSelector((state) => state.tasks.loading);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const handleCreateTask = () => {
    if (!title.trim()) {
      setError("Опишите задачу");
      return;
    }
    setError(null);
    dispatch(createTask(title));
    setTitle("");
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTask();
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        gap: 3,
        p: 2,
      }}
    >
      <TextField
        size="small"
        label={"Новая задача"}
        placeholder="Опишите задачу"
        error={Boolean(error)}
        helperText={error}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(null);
        }}
      />
      <Button
        variant="contained"
        disabled={create}
        sx={{ textTransform: "none" }}
        onClick={handleCreateTask}
      >
        Добавить
      </Button>
    </Box>
  );
};

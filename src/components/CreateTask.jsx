import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useCreateTaskMutation } from "../rtk/rtk-query/apiSlice";

export const CreateTask = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const handleCreateTask = async () => {
    if (!title.trim()) {
      setError("Опишите задачу");
      return;
    }
    setError(null);
    await createTask({ title });
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
        disabled={isLoading}
        sx={{ textTransform: "none" }}
        onClick={handleCreateTask}
      >
        Добавить
      </Button>
    </Box>
  );
};

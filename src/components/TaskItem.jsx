import {
  Alert,
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useRef, useState, useEffect } from "react";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useLazyGetTaskQuery,
} from "../rtk/rtk-query/apiSlice";

export const TaskItem = ({ task }) => {
  const [deleteTask, { isLoading: isLoadingDelete }] = useDeleteTaskMutation();
  const [completeTask, { isLoading: isLoadingComplete }] =
    useCompleteTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [trigger, { data: currentTask, isSuccess, reset }] =
    useLazyGetTaskQuery();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState(null);
  const editInputRef = useRef();

  useEffect(() => {
    if (editMode) {
      editInputRef.current?.focus();
    }
  }, [editMode]);
  const handleComplete = async () => {
    await completeTask(task.id);
  };

  const handleEditTask = async () => {
    if (!editMode) {
      setTitle(task.title);
      setError(null);
      setEditMode(true);
      return;
    }

    if (!title.trim()) {
      setError("У задачи должно быть описание");
      return;
    }
    await editTask({ id: task.id, newTitle: title.trim() });
    setEditMode(false);
    setError(null);
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setEditMode(false);
      setError(null);
      setTitle(task.title);
    }
    if (e.key === "Enter") {
      handleEditTask();
    }
  };

  const handleClickOut = (e) => {
    if (e.relatedTarget && e.relatedTarget.closest("input[type=checkbox]")) {
      return;
    }
    setEditMode(false);
    setError(null);
    setTitle(task.title);
  };

  return (
    <ListItem>
      <Checkbox
        checked={task.completed}
        onChange={handleComplete}
        disabled={isLoadingComplete}
      />
      {!editMode ? (
        <ListItemText
          onClick={() => {
            trigger(task.id);
          }}
          sx={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {title}
        </ListItemText>
      ) : (
        <TextField
          inputRef={editInputRef}
          value={title}
          onChange={(e) => {
            setError(null);
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => handleEsc(e)}
          onBlur={(e) => handleClickOut(e)}
          error={!!error}
          helperText={error}
          sx={{ flexGrow: 1 }}
        />
      )}

      <Checkbox
        checked={editMode}
        icon={<EditIcon />}
        checkedIcon={<SaveIcon />}
        onChange={handleEditTask}
        onKeyDown={(e) => e.preventDefault()}
      />
      <IconButton
        onClick={async () => await deleteTask(task.id)}
        disabled={isLoadingDelete}
      >
        <DeleteIcon />
      </IconButton>
      {currentTask && (
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => reset()}
          message={currentTask.title}
        />
      )}
    </ListItem>
  );
};

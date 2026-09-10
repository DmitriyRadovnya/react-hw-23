import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask, editTask } from "../redux/actions";

export const TaskItem = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const editInputRef = useRef();

  useEffect(() => {
    if (editMode) {
      editInputRef.current?.focus();
    }
  }, [editMode]);
  const handleComplete = () => {
    dispatch(completeTask(task.id));
  };

  const handleEditTask = () => {
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
    dispatch(editTask({ id: task.id, title: title.trim() }));
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
      <Checkbox checked={task.isDone} onChange={handleComplete} />
      {!editMode ? (
        <ListItemText
          sx={{ textDecoration: task.isDone ? "line-through" : "none" }}
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
      <IconButton onClick={() => dispatch(deleteTask(task.id))}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

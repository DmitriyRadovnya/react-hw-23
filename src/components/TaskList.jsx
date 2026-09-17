import { List } from "@mui/material";
import { TaskItem } from "./TaskItem";
import { useGetTasksQuery } from "../rtk/rtk-query/apiSlice";

export const TaskList = () => {
  const { data: tasks, isLoading } = useGetTasksQuery();

  if (isLoading) return <h1>Loading...</h1>;
  return (
    tasks && (
      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    )
  );
};

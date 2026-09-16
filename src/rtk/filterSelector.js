import { createSelector } from "@reduxjs/toolkit";

export const selectTask = (state) => state.tasks.tasks;
export const selectFilter = (state) => state.filter;

export const filterTasks = createSelector(
  [selectTask, selectFilter],
  (tasks, filter) => {
    switch (filter) {
      case "active":
        return tasks.filter((t) => !t.completed);
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  },
);

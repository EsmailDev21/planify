"use client";
import TaskTopBar from "@/components/app/tasks/components/TaskTopBar";
import { GanttTaskProps } from "@/components/app/tasks/views/GanttTask.component";
import GanttView from "@/components/app/tasks/views/GanttView.component";
import { selectTasks } from "@/lib/redux/slices/taskSlice";
import { RootState } from "@/lib/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

const TasksIndex = () => {
  const selectAllTasks = (state: RootState) => state.tasks.tasks;
  const selectFilters = (state: RootState) => state.tasks.filters;
  const tasks = useSelector(selectAllTasks);
  const filters = useSelector(selectFilters);

  const filteredTasks = (tasks: GanttTaskProps[], filters: any) => {
    return tasks.filter((task) => {
      const matchesStatus = !filters.status || task.status === filters.status;
      const matchesPriority =
        !filters.priority || task.priority === filters.priority;
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag: string) => task.tags.includes(tag));
      const matchesSearch =
        !filters.search ||
        task.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStartDate =
        !filters.startDate ||
        new Date(task.startDate) >= new Date(filters.startDate);
      const matchesEndDate =
        !filters.endDate || new Date(task.endDate) <= new Date(filters.endDate);

      return (
        matchesStatus &&
        matchesPriority &&
        matchesTags &&
        matchesSearch &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  };
  return (
    <div>
      <TaskTopBar />
      <GanttView tasks={filteredTasks(tasks, filters)} zoomLevel={6} />
    </div>
  );
};

export default TasksIndex;

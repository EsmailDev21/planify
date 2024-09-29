"use client";
import TaskTopBar from "@/components/app/tasks/components/TaskTopBar";
import BoardTask from "@/components/app/tasks/views/board/BoardTask.component";
import BoardView from "@/components/app/tasks/views/board/BoardView.component";
import { GanttTaskProps } from "@/components/app/tasks/views/GanttTask.component";
import GanttView from "@/components/app/tasks/views/GanttView.component";
import VerticalZoomSlider from "@/components/app/tasks/views/GanttZoomSlider";
import { Badge } from "@/components/ui/badge";
import { selectTasks } from "@/lib/redux/slices/taskSlice";
import { RootState } from "@/lib/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import React, { useCallback, useState } from "react";
import {
  PiAlignLeftLight,
  PiColumnsLight,
  PiListChecksLight,
  PiListLight,
} from "react-icons/pi";
import { useSelector } from "react-redux";

export type ViewType = "GANTT" | "BOARD" | "LIST";
const TasksIndex = () => {
  const selectAllTasks = (state: RootState) => state.tasks.tasks;
  const selectFilters = (state: RootState) => state.tasks.filters;
  const tasks = useSelector(selectAllTasks);
  const filters = useSelector(selectFilters);
  const [view, setView] = useState<ViewType>("GANTT");
  const [rerenderFlag, setRerenderFlag] = useState(0);

  const forceRerender = useCallback(() => {
    setRerenderFlag((prev) => prev + 1);
  }, []);
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
  const [zoomLevel, setZoomLevel] = useState(6); // Initial zoom level

  const handleZoomChange = (newZoomLevel: number) => {
    setZoomLevel(newZoomLevel);
  };
  return (
    <div className="flex flex-col">
      <TaskTopBar
        view={view}
        setView={setView}
        onZoomChange={handleZoomChange}
      />
      {view === "GANTT" ? (
        <>
          <div className="overflow-x-auto flex-grow flex">
            <GanttView
              onForceRerender={forceRerender}
              key={rerenderFlag}
              tasks={filteredTasks(tasks, filters)}
              zoomLevel={zoomLevel}
            />
          </div>
        </>
      ) : view === "BOARD" ? (
        <BoardView />
      ) : null}
    </div>
  );
};

export default TasksIndex;

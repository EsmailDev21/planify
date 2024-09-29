"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { format } from "date-fns";
import { CiSearch, CiFilter } from "react-icons/ci";
import {
  PiCalendarLight,
  PiCheckCircleFill,
  PiWarningCircleLight,
  PiXLight,
  PiAlignLeftLight,
  PiColumnsLight,
  PiListChecksLight,
} from "react-icons/pi"; // Adjust import paths as necessary
import { AppDispatch } from "@/lib/redux/store";
import { addTask, selectTasks, setFilters } from "@/lib/redux/slices/taskSlice";
import { AddTaskDialog, GanttTaskProps } from "./AddTask";
import VerticalZoomSlider from "../views/GanttZoomSlider";
import { TaskModel } from "@/lib/types/models";
import { ViewType } from "@/app/app/tasks/page";

const TaskTopBar = ({
  onZoomChange,
  setView,
  view,
}: {
  onZoomChange: (zoomLevel: number) => void;
  setView: (view: ViewType) => void;
  view: ViewType;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { filters, tasks } = useSelector(selectTasks);
  const [isOpen, setOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (key: any, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    dispatch(setFilters(updatedFilters));
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      status: "",
      priority: "",
      tags: [],
      startDate: null,
      endDate: null,
      search: "",
    };
    dispatch(setFilters(defaultFilters));
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-4">
      {/* Search Filter */}
      <div className="flex items-center  w-[40%]">
        <Input
          placeholder="Rechercher par titre ou assigné..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="pr-10 mr-2"
        />
        <Button variant={"outline"}>
          <CiSearch size={18} className=" text-slate-500 dark:text-slate-400" />
        </Button>
      </div>

      {/* View Badges */}
      <div className="flex flex-row space-x-2">
        <Badge
          key={"GANTT"}
          onClick={() => setView("GANTT")}
          variant={"outline"}
          className="text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
        >
          <PiAlignLeftLight size={14} />
          <span>Gantt</span>
        </Badge>
        <Badge
          key={"BOARD"}
          onClick={() => setView("BOARD")}
          variant={"outline"}
          className="text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
        >
          <PiColumnsLight size={14} />
          <span>Board</span>
        </Badge>
        <Badge
          key={"LIST"}
          onClick={() => setView("LIST")}
          variant={"outline"}
          className="text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
        >
          <PiListChecksLight size={14} />
          <span>List</span>
        </Badge>
      </div>
      {view === "GANTT" && <VerticalZoomSlider onZoomChange={onZoomChange} />}
      {/* Filter Button */}
      <div className="flex space-x-2">
        <Drawer
          direction="left"
          open={isDrawerOpen}
          onOpenChange={setDrawerOpen}
        >
          <DrawerTrigger asChild>
            <Button variant="outline">
              <CiFilter className="text-slate-500 dark:text-slate-400" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4 h-screen w-64 bg-white">
            <div className="flex flex-col gap-4">
              {/* Status Filter */}
              <Button
                variant="outline"
                onClick={() => handleFilterChange("status", "")}
                className="flex items-center space-x-2"
              >
                <PiCheckCircleFill className="text-slate-500 dark:text-slate-400" />
                <span>{filters.status || "Statut"}</span>
              </Button>

              {/* Priority Filter */}
              <Button
                variant="outline"
                onClick={() => handleFilterChange("priority", "")}
                className="flex items-center space-x-2"
              >
                <PiWarningCircleLight className="text-slate-500 dark:text-slate-400" />
                <span>{filters.priority || "Priorité"}</span>
              </Button>

              {/* Tags Filter */}
              <Input
                placeholder="Tags"
                value={filters.tags.join(", ")}
                onChange={(e) =>
                  handleFilterChange(
                    "tags",
                    e.target.value.split(",").map((tag) => tag.trim())
                  )
                }
              />

              {/* Due Date Filter */}
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={() => handleFilterChange("startDate", new Date())}
              >
                <PiCalendarLight className="text-slate-500 dark:text-slate-400" />
                <span>
                  {filters.startDate
                    ? `Début: ${format(filters.startDate, "dd MMM yyyy")}`
                    : filters.endDate
                    ? `Fin: ${format(filters.endDate, "dd MMM yyyy")}`
                    : "Date"}
                </span>
              </Button>

              {/* Clear Filters Button */}
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="flex items-center space-x-2"
              >
                <PiXLight className="mr-2" />
                <span>Réinitialiser</span>
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Add Task Button */}
        <AddTaskDialog
          id={tasks.length.toString()}
          isOpen={isOpen}
          setOpen={setOpen}
          onClose={() => setOpen(!isOpen)}
          onSubmit={(task: TaskModel) => dispatch(addTask(task))}
        />
      </div>
    </div>
  );
};

export default TaskTopBar;

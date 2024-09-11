"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Shadcn Menu components
import { format } from "date-fns";
import { CiSearch } from "react-icons/ci";
import {
  PiCalendarLight,
  PiCheckCircleFill,
  PiTagLight,
  PiWarningCircleLight,
  PiXLight,
} from "react-icons/pi"; // Icons for visual effect // Adjust import paths as necessary
import { AppDispatch } from "@/lib/redux/store";
import { addTask, selectTasks, setFilters } from "@/lib/redux/slices/taskSlice";
import { AddTaskDialog, GanttTaskProps } from "./AddTask";
import VerticalZoomSlider from "../views/GanttZoomSlider";
import {TaskModel} from "@/lib/types/models"
const TaskTopBar = ({
  onZoomChange,
}: {
  onZoomChange: (zoomLevel: number) => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { filters, tasks } = useSelector(selectTasks);
  const [isOpen, setOpen] = useState(false);
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
    <div className="flex flex-wrap  items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-4">
      {/* New Task Button */}
      <AddTaskDialog
        id={tasks.length.toString()}
        isOpen={isOpen}
        setOpen={setOpen}
        onClose={function (): void {
          setOpen(!isOpen);
        }}
        onSubmit={function (task: TaskModel): void {
          dispatch(addTask(task));
        }}
      />

      {/* Search Filter */}
      <div className="relative flex items-center w-full max-w-xs">
        <Input
          placeholder="Rechercher par titre ou assigné..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="pr-10"
        />
        <CiSearch className="absolute right-3 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <PiCheckCircleFill className="text-slate-500 dark:text-slate-400" />
            <span>{filters.status || "Statut"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleFilterChange("status", "")}>
            Tous
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("status", "En cours")}
          >
            En cours
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("status", "Terminé")}
          >
            Terminé
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("status", "À faire")}
          >
            À faire
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Priority Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <PiWarningCircleLight className="text-slate-500 dark:text-slate-400" />
            <span>{filters.priority || "Priorité"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => handleFilterChange("priority", "")}>
            Toutes
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("priority", "Haute")}
          >
            Haute
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("priority", "Moyenne")}
          >
            Moyenne
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => handleFilterChange("priority", "Basse")}
          >
            Basse
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tags Filter */}
      <div className="relative flex items-center max-w-xs">
        <Input
          placeholder="Tags"
          value={filters.tags.join(", ")}
          onChange={(e) =>
            handleFilterChange(
              "tags",
              e.target.value.split(",").map((tag) => tag.trim())
            )
          }
          className="pr-10"
        />
        <PiTagLight className="absolute right-3 text-slate-500 dark:text-slate-400" />
      </div>

      {/* Due Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2">
            <PiCalendarLight className="text-slate-500 dark:text-slate-400" />
            <span>
              {filters.startDate
                ? `Début: ${format(filters.startDate, "dd MMM yyyy")}`
                : filters.endDate
                ? `Fin: ${format(filters.endDate, "dd MMM yyyy")}`
                : "Date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={
              filters.startDate ? new Date(filters.startDate) : undefined
            }
            onSelect={(date: any) => handleFilterChange("startDate", date)}
          />
          <Calendar
            mode="single"
            selected={filters.endDate ? new Date(filters.endDate) : undefined}
            onSelect={(date: any) => handleFilterChange("endDate", date)}
          />
        </PopoverContent>
      </Popover>

      <VerticalZoomSlider onZoomChange={onZoomChange} />
      {/* Clear Filters Button */}
      <Button
        variant="ghost"
        onClick={handleClearFilters}
        className="ml-auto flex items-center space-x-2"
      >
        <PiXLight className="mr-2" />
        <span>Réinitialiser</span>
      </Button>
    </div>
  );
};

export default TaskTopBar;

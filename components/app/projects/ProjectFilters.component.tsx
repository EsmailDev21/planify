"use client";

import React, { useState } from "react";
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
} from "react-icons/pi";
import { Priority, Status } from "@/lib/types/models";
import { ProjectAddCard } from "./AddProjectDialog";
// Icons for visual effect

type ProjectFiltersProps = {
  onFilterChange: (filters: Filters) => void;
};

type Filters = {
  status: Status | null;
  priority: Priority | null;
  tags: string[];
  dueDate: Date | null;
  search: string;
};

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    status: null,
    priority: null,
    tags: [],
    dueDate: null,
    search: "",
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap w-full items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-4">
      {/* Search Filter */}
      <ProjectAddCard />
      <div className="relative flex items-center w-full max-w-xs">
        <Input
          placeholder="Rechercher..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="pr-10"
        />
        <CiSearch className="absolute right-3 text-slate-500 dark:text-slate-400" />
      </div>
      {/* Status Filter using Menu */}
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
            onSelect={() => handleFilterChange("status", "En attente")}
          >
            En attente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Priority Filter using Menu */}
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

      {/* Tags Filter using Input */}
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
              {filters.dueDate
                ? format(filters.dueDate, "dd MMM yyyy")
                : "Date d'échéance"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={new Date(filters.dueDate ?? "")}
            onSelect={(date: any) => handleFilterChange("dueDate", date)}
          />
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      <Button
        variant="ghost"
        onClick={() => {
          setFilters({
            status: null,
            priority: null,
            tags: [],
            dueDate: null,
            search: "",
          });
          onFilterChange({
            status: null,
            priority: null,
            tags: [],
            dueDate: null,
            search: "",
          });
        }}
        className="ml-auto flex items-center space-x-2"
      >
        <PiXLight className="mr-2" />
        <span>Réinitialiser</span>
      </Button>
    </div>
  );
};

export default ProjectFilters;

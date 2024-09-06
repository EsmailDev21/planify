"use client";
import ProjectCard from "@/components/app/projects/ProjectCard.component";
import ProjectFilters from "@/components/app/projects/ProjectFilters.component";
import ProjectList from "@/components/app/projects/ProjectList.component";
import { sampleProjects } from "@/lib/mock/projects.mock";
import { setFilters } from "@/lib/redux/slices/projectSlice";
import { RootState } from "@/lib/redux/store";
import { ProjectModel } from "@/lib/types/models";
import React, { useState } from "react"; // Adjust the path based on your structure
import { useSelector } from "react-redux";

const ProjectsIndex = () => {
  const selectAllProjects = (state: RootState) => state.projects.projects;
  const selectFilters = (state: RootState) => state.projects.filters;
  const projects = useSelector(selectAllProjects);
  const filters = useSelector(selectFilters);

  const filteredProjects = (projects: ProjectModel[], filters: any) => {
    return projects.filter((project) => {
      const matchesStatus =
        !filters.status || project.status === filters.status;
      const matchesPriority =
        !filters.priority || project.priority === filters.priority;
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag: string) => project.tags.includes(tag));
      const matchesSearch =
        !filters.search ||
        project.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesDueDate =
        !filters.dueDate ||
        new Date(project.dueDate) >= new Date(filters.dueDate);

      return (
        matchesStatus &&
        matchesPriority &&
        matchesTags &&
        matchesSearch &&
        matchesDueDate
      );
    });
  };

  // Handler to update filters based on user input
  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  return (
    <div className=" min-h-screen">
      {/* Filters Section */}
      <ProjectFilters onFilterChange={handleFilterChange} />

      {/* Project List Section */}
      <ProjectList projects={filteredProjects(projects, filters)}></ProjectList>

      {/* Message when no projects match the filters */}
      {filteredProjects.length === 0 && (
        <p className="text-center text-slate-600 dark:text-slate-400">
          Aucun projet ne correspond aux filtres sélectionnés.
        </p>
      )}
    </div>
  );
};

export default ProjectsIndex;

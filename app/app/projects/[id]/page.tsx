"use client";
import ProjectCard from "@/components/app/projects/ProjectCard.component";
import ProjectFilters from "@/components/app/projects/ProjectFilters.component";
import ProjectList from "@/components/app/projects/ProjectList.component";
import { sampleProjects } from "@/lib/mock/projects.mock";
import { setFilters } from "@/lib/redux/slices/projectSlice";
import { RootState } from "@/lib/redux/store";
import { ProjectModel } from "@/lib/types/models";
import { useParams } from "next/navigation";
import React, { useState } from "react"; // Adjust the path based on your structure
import { useSelector } from "react-redux";

const ProjectDetailsIndex = () => {
  const selectAllProjects = (state: RootState) => state.projects.projects;
  const projects = useSelector(selectAllProjects);
  const { id } = useParams();
  const projectData = projects.find((project) => project.id === id);

  // Handler to update filters based on user input

  return (
    <div className=" min-h-screen">
      {/* Message when no projects match the filters */}
      {!projectData ? (
        <p className="text-center text-slate-600 dark:text-slate-400">
          Cet projet n'existe pas plus, peut etre supprimé.
        </p>
      ) : (
        <ProjectCard {...projectData} />
      )}
    </div>
  );
};

export default ProjectDetailsIndex;

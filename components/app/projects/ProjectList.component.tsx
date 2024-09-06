"use client";

import React from "react"; // Adjust the import path based on your project structure
import ProjectCard from "./ProjectCard.component";
import { Priority, ProjectModel, Status } from "@/lib/types/models";
import ProjectCardResumed from "./ProjectCardResumed.component";

// Example project data type

type ProjectListProps = {
  projects: ProjectModel[];
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid gap-6 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCardResumed
            id={project.id}
            key={project.id}
            title={project.title}
            dueDate={project.dueDate}
            client={project.client}
            thumbnail={project.thumbnail}
          />
        ))
      ) : (
        <p className="text-center text-slate-600 dark:text-slate-400">
          Aucun projet à afficher pour le moment.
        </p>
      )}
    </div>
  );
};

export default ProjectList;

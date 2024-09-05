"use client";

import React from "react"; // Adjust the import path based on your project structure
import ProjectCard from "./ProjectCard.component";

// Example project data type
type Project = {
  id: number;
  title: string;
  status: string;
  description: string;
  dueDate: Date;
  progress: number;
  priority: string;
  tags: string[];
  teamMembers: { name: string; imageUrl?: string }[];
};

type ProjectListProps = {
  projects: Project[];
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <div className="grid gap-6 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            status={project.status}
            description={project.description}
            dueDate={project.dueDate}
            progress={project.progress}
            priority={project.priority}
            tags={project.tags}
            teamMembers={project.teamMembers}
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

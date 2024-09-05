"use client";
import ProjectCard from "@/components/app/projects/ProjectCard.component";
import ProjectFilters from "@/components/app/projects/ProjectFilters.component";
import ProjectList from "@/components/app/projects/ProjectList.component";
import React, { useState } from "react"; // Adjust the path based on your structure

const sampleProjects = [
  {
    id: 1,
    title: "Construction d'un Immeuble Résidentiel Moderne",
    description:
      "Projet de construction d'un immeuble résidentiel de 10 étages avec une conception architecturale contemporaine, incluant la gestion des équipes sur le chantier et le suivi des délais.",
    tags: ["Urgent", "Structure", "Sécurité"],
    priority: "Haute",
    status: "En cours",
    dueDate: new Date(),
    progress: 65, // Progress in percentage
    teamMembers: [
      {
        name: "Jean Dupont",
        imageUrl: "/assets/images/avatars/avatar2.png",
      },
      {
        name: "Marie Dubois",
        imageUrl: "/assets/images/avatars/marie-dubois.jpg",
      },
      {
        name: "Paul Martin",
        imageUrl: "/assets/images/avatars/avatar5.png",
      },
    ],
  },
  {
    id: 2,
    title: "Réhabilitation d'un Pont Routier",
    description:
      "Rénovation d'un pont majeur, incluant le renforcement de la structure et l'amélioration de la sécurité routière avec un impact minimal sur la circulation.",
    tags: ["Rénovation", "Infrastructure", "Sécurité"],
    priority: "Moyenne",
    status: "Terminé",
    dueDate: new Date(),
    progress: 100, // Project is complete
    teamMembers: [
      {
        name: "Alice Leroy",
        imageUrl: "/assets/images/avatars/avatar1.png",
      },
      {
        name: "Marc Petit",
        imageUrl: "/assets/images/avatars/avatar6.png",
      },
      {
        name: "Claire Bernard",
        imageUrl: "/assets/images/avatars/avatar10.png",
      },
    ],
  },
  {
    id: 3,
    title: "Développement d'un Parc Industriel Durable",
    description:
      "Création d'un parc industriel avec des bâtiments écologiques et des systèmes de gestion des ressources pour minimiser l'empreinte carbone.",
    tags: ["Écologique", "Innovation", "Logistique"],
    priority: "Basse",
    status: "En attente",
    dueDate: new Date(),
    progress: 25, // Initial stages of the project
    teamMembers: [
      {
        name: "Sophie Richard",
        imageUrl: "/assets/images/avatars/avatar3.png",
      },
      {
        name: "Thomas Moreau",
        imageUrl: "/assets/images/avatars/avatar7.png",
      },
      {
        name: "Lucas Girard",
        imageUrl: "/assets/images/avatars/avatar8.png",
      },
    ],
  },
  {
    id: 4,
    title: "Construction d'un Immeuble Résidentiel Moderne",
    description:
      "Projet de construction d'un immeuble résidentiel de 10 étages avec une conception architecturale contemporaine, incluant la gestion des équipes sur le chantier et le suivi des délais.",
    tags: ["Urgent", "Structure", "Sécurité"],
    priority: "Haute",
    status: "En cours",
    dueDate: new Date(),
    progress: 65, // Progress in percentage
    teamMembers: [
      {
        name: "Jean Dupont",
        imageUrl: "/assets/images/avatars/avatar2.png",
      },
      {
        name: "Marie Dubois",
        imageUrl: "/assets/images/avatars/marie-dubois.jpg",
      },
      {
        name: "Paul Martin",
        imageUrl: "/assets/images/avatars/avatar5.png",
      },
    ],
  },
  {
    id: 5,
    title: "Réhabilitation d'un Pont Routier",
    description:
      "Rénovation d'un pont majeur, incluant le renforcement de la structure et l'amélioration de la sécurité routière avec un impact minimal sur la circulation.",
    tags: ["Rénovation", "Infrastructure", "Sécurité"],
    priority: "Moyenne",
    status: "Terminé",
    dueDate: new Date(),
    progress: 100, // Project is complete
    teamMembers: [
      {
        name: "Alice Leroy",
        imageUrl: "/assets/images/avatars/avatar1.png",
      },
      {
        name: "Marc Petit",
        imageUrl: "/assets/images/avatars/avatar6.png",
      },
      {
        name: "Claire Bernard",
        imageUrl: "/assets/images/avatars/avatar10.png",
      },
    ],
  },
];

const ProjectsIndex = () => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    tags: [],
    dueDate: null,
    search: "",
  });

  // Handler to update filters based on user input
  const handleFilterChange = (updatedFilters: any) => {
    setFilters(updatedFilters);
  };

  // Filter logic to filter projects based on the selected filters
  const filteredProjects = sampleProjects.filter((project) => {
    const matchesStatus = !filters.status || project.status === filters.status;
    const matchesPriority =
      !filters.priority || project.priority === filters.priority;
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => project.tags.includes(tag));
    const matchesSearch =
      !filters.search ||
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDueDate =
      !filters.dueDate ||
      (project.dueDate &&
        project.dueDate.toDateString() ===
          new Date(filters.dueDate).toDateString());

    return (
      matchesStatus &&
      matchesPriority &&
      matchesTags &&
      matchesSearch &&
      matchesDueDate
    );
  });

  return (
    <div className=" min-h-screen">
      {/* Filters Section */}
      <ProjectFilters onFilterChange={handleFilterChange} />

      {/* Project List Section */}
      <ProjectList projects={filteredProjects}></ProjectList>

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

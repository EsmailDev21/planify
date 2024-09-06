import { Priority, ProjectModel, Status } from "../types/models";

export const sampleProjects: ProjectModel[] = [
  {
    id: "1",
    title: "Construction d'un Immeuble Résidentiel Moderne",
    description:
      "Projet de construction d'un immeuble résidentiel de 10 étages avec une conception architecturale contemporaine, incluant la gestion des équipes sur le chantier et le suivi des délais.",
    tags: ["Urgent", "Structure", "Sécurité"],
    priority: Priority.HIGH,
    status: Status.IN_PROGRESS,
    dueDate: new Date(), // Update this as per the actual due date
    progress: 65, // Progress in percentage
    address: "123 Rue de la République, Paris, France",
    createdAt: new Date("2024-06-01"), // Creation date of the project
    teamMembers: [
      {
        fullName: "Jean Dupont",
        profilePhoto: "/assets/images/avatars/avatar2.png",
      },
      {
        fullName: "Marie Dubois",
        profilePhoto: "/assets/images/avatars/marie-dubois.jpg",
      },
      {
        fullName: "Paul Martin",
        profilePhoto: "/assets/images/avatars/avatar5.png",
      },
    ],
    thumbnail: "/assets/images/project_thumbnails/project1.jpg",
    client: {
      fullName: "John Doe",
      profilePhoto: "/assets/images/avatars/avatar7.png",
      phoneNumber: "+216 98 765 423",
    },
  },
  {
    id: "2",
    title: "Réhabilitation d'un Pont Routier",
    description:
      "Rénovation d'un pont majeur, incluant le renforcement de la structure et l'amélioration de la sécurité routière avec un impact minimal sur la circulation.",
    tags: ["Rénovation", "Infrastructure", "Sécurité"],
    priority: Priority.MEDIUM,
    status: Status.DONE,
    dueDate: new Date(), // Update this as per the actual due date
    progress: 100, // Project is complete
    address: "456 Route Nationale, Lyon, France",
    createdAt: new Date("2024-03-15"), // Creation date of the project
    teamMembers: [
      {
        fullName: "Alice Leroy",
        profilePhoto: "/assets/images/avatars/avatar1.png",
      },
      {
        fullName: "Marc Petit",
        profilePhoto: "/assets/images/avatars/avatar6.png",
      },
      {
        fullName: "Claire Bernard",
        profilePhoto: "/assets/images/avatars/avatar10.png",
      },
    ],
    thumbnail: "/assets/images/project_thumbnails/project2.jpg",
    client: {
      fullName: "Alice Smith",
      profilePhoto: "/assets/images/avatars/avatar2.png",
      phoneNumber: "+216 90 465 423",
    },
  },
  {
    id: "3",
    title: "Développement d'un Parc Industriel Durable",
    description:
      "Création d'un parc industriel avec des bâtiments écologiques et des systèmes de gestion des ressources pour minimiser l'empreinte carbone.",
    tags: ["Écologique", "Innovation", "Logistique"],
    priority: Priority.LOW,
    status: Status.TODO,
    dueDate: new Date(), // Update this as per the actual due date
    progress: 25, // Initial stages of the project
    address: "789 Boulevard Industriel, Lille, France",
    createdAt: new Date("2024-01-10"), // Creation date of the project
    teamMembers: [
      {
        fullName: "Sophie Richard",
        profilePhoto: "/assets/images/avatars/avatar3.png",
      },
      {
        fullName: "Thomas Moreau",
        profilePhoto: "/assets/images/avatars/avatar7.png",
      },
      {
        fullName: "Lucas Girard",
        profilePhoto: "/assets/images/avatars/avatar8.png",
      },
    ],
    thumbnail: "/assets/images/project_thumbnails/project3.jpg",
    client: {
      fullName: "François Romain",
      profilePhoto: "/assets/images/avatars/avatar7.png",
      phoneNumber: "+33 123 456 789",
    },
  },
];

import {
  ClientModel,
  AutoEntrepreneur,
  UserRole,
  BusinessOwner,
  QuoteModel,
  QuoteStatus,
  QuoteItemType,
  Priority,
  Status,
} from "../types/models";
import { addDays } from "date-fns";
import { generateRandomColor, generateRandomAvatar } from "../utils";

// Sample client
const client: ClientModel = {
  fullName: "Acme Corp",
  profilePhoto: "https://example.com/photos/acme.jpg",
  phoneNumber: "+1234567890",
};

// Sample auto entrepreneur
const autoEntrepreneur: AutoEntrepreneur = {
  id: "ae1",
  fullName: "Alex Johnson",
  email: "alex@autoentrepreneur.com",
  phoneNumber: "+1987654321",
  profilePhoto: "https://example.com/photos/alex.jpg",
  role: UserRole.AUTO_ENTERPRENEUR,
};

// Sample business owner
const businessOwner: BusinessOwner = {
  id: "bo1",
  fullName: "Sara White",
  email: "sara@businessowner.com",
  phoneNumber: "+1098765432",
  profilePhoto: "https://example.com/photos/sara.jpg",
  role: UserRole.BUSINESS_OWNER,
};

const quotes: QuoteModel[] = [
  {
    id: "quote1",
    projectId: "project1",
    sender: autoEntrepreneur,
    client: client,
    amount: 5000,
    description:
      "Devis pour la rénovation d'un appartement de deux chambres, y compris peinture, revêtement de sol et rénovation de la cuisine.",
    status: QuoteStatus.PENDING,
    createdAt: new Date("2024-09-03"),
    updatedAt: new Date("2024-09-05"),
    title: "Devis Rénovation Appartement",
    dueDate: new Date("2024-09-20"),
    thumbnail: "/assets/images/project_thumbnails/project1.jpg",
    address: "123 Rue Principale, Villeurbanne, État, 12345",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 20,
        quantity: 1,
        tva: 5,
        totalPrice: 25,
        task: {
          id: "task1",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 7),
          priority: Priority.LOW,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "John Doe",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Préparation des surfaces",
          description:
            "Préparer les surfaces avant de commencer la peinture, y compris le ponçage et le nettoyage des murs.",
        },
      },
      {
        id: "item2",
        type: QuoteItemType.TASK,
        unitPrice: 50,
        quantity: 1,
        tva: 5,
        totalPrice: 50,
        task: {
          id: "task2",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 12),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Jane Smith",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Installation du revêtement de sol",
          description:
            "Installer le nouveau revêtement de sol dans les chambres et le salon, y compris la préparation et la pose du matériau.",
        },
      },
      {
        id: "item3",
        type: QuoteItemType.TASK,
        unitPrice: 100,
        quantity: 1,
        tva: 5,
        totalPrice: 100,
        task: {
          id: "task3",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 15),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Alice Johnson",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Rénovation de la cuisine",
          description:
            "Rénovation complète de la cuisine, y compris le démontage des anciens équipements, l'installation des nouveaux meubles, et la mise en place des appareils électroménagers.",
        },
      },
    ],
  },

  {
    id: "quote2",
    projectId: "project2",
    sender: businessOwner,
    client: client,
    amount: 12000,
    description:
      "Devis pour la construction d'un petit immeuble de bureaux, y compris travaux de fondation, câblage électrique et plomberie.",
    status: QuoteStatus.ACCEPTED,
    createdAt: new Date("2024-08-22"),
    updatedAt: new Date("2024-08-25"),
    title: "Devis Construction Immeuble de Bureaux",
    dueDate: new Date("2024-09-15"),
    thumbnail: "/assets/images/project_thumbnails/project2.jpg",
    address: "456 Parc d'Affaires, Villeurbanne, État, 67890",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 5000,
        quantity: 1,
        tva: 5,
        totalPrice: 5000,
        task: {
          id: "task11",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 10),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Michael Brown",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Travaux de Fondation",
          description:
            "Réalisations des travaux de fondation, y compris excavation, pose des fondations et préparation du sol pour la construction.",
          subtasks: [
            {
              id: "subtask11",
              color: generateRandomColor(),
              endDate: addDays(new Date(), 5),
              priority: Priority.HIGH,
              progress: 0,
              startDate: new Date(),
              status: Status.TODO,
              tags: [],
              teamMembers: [
                {
                  fullName: "Michael Brown",
                  profilePhoto:
                    "/assets/images/avatars/" + generateRandomAvatar() + ".png",
                },
              ],
              title: "Travaux de Fondation - part 1",
              description:
                "Réalisations des travaux de fondation, y compris excavation, pose des fondations et préparation du sol pour la construction.",
            },
            {
              id: "subtask12",
              color: generateRandomColor(),
              endDate: addDays(new Date(), 10),
              priority: Priority.HIGH,
              progress: 0,
              startDate: addDays(new Date(), 5),
              status: Status.TODO,
              tags: [],
              teamMembers: [
                {
                  fullName: "Michael Brown",
                  profilePhoto:
                    "/assets/images/avatars/" + generateRandomAvatar() + ".png",
                },
              ],
              title: "Travaux de Fondation - part 2",
              description:
                "Réalisations des travaux de fondation, y compris excavation, pose des fondations et préparation du sol pour la construction.",
            },
          ],
        },
      },
      {
        id: "item22",
        type: QuoteItemType.TASK,
        unitPrice: 3000,
        quantity: 1,
        tva: 5,
        totalPrice: 3000,
        task: {
          id: "task2",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 20),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: addDays(new Date(), 0),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Laura Wilson",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Câblage Électrique",
          description:
            "Installation du câblage électrique, y compris la pose des câbles, des prises et des interrupteurs pour le bâtiment.",
          subtasks: [
            {
              id: "subtask11",
              color: generateRandomColor(),
              endDate: addDays(new Date(), 10),
              priority: Priority.HIGH,
              progress: 0,
              startDate: new Date(),
              status: Status.TODO,
              tags: [],
              teamMembers: [
                {
                  fullName: "Michael Brown",
                  profilePhoto:
                    "/assets/images/avatars/" + generateRandomAvatar() + ".png",
                },
              ],
              title: "Travaux de Fondation - part 1",
              description:
                "Réalisations des travaux de fondation, y compris excavation, pose des fondations et préparation du sol pour la construction.",
            },
            {
              id: "subtask12",
              color: generateRandomColor(),
              endDate: addDays(new Date(), 20),
              priority: Priority.HIGH,
              progress: 0,
              startDate: addDays(new Date(), 10),
              status: Status.TODO,
              tags: [],
              teamMembers: [
                {
                  fullName: "Michael Brown",
                  profilePhoto:
                    "/assets/images/avatars/" + generateRandomAvatar() + ".png",
                },
              ],
              title: "Travaux de Fondation - part 2",
              description:
                "Réalisations des travaux de fondation, y compris excavation, pose des fondations et préparation du sol pour la construction.",
            },
          ],
        },
      },
      {
        id: "item33",
        type: QuoteItemType.TASK,
        unitPrice: 4000,
        quantity: 1,
        tva: 5,
        totalPrice: 4000,
        task: {
          id: "task3",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 30),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Emily Davis",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Plomberie",
          description:
            "Installation des systèmes de plomberie, y compris les conduites d'eau, les évacuations et les équipements sanitaires.",
        },
      },
    ],
  },

  {
    id: "quote3",
    projectId: "project3",
    sender: autoEntrepreneur,
    client: client,
    amount: 8000,
    description:
      "Devis pour un projet d'aménagement paysager résidentiel, incluant la conception du jardin, l'installation d'une terrasse et l'entretien de la pelouse.",
    status: QuoteStatus.REJECTED,
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-07-17"),
    title: "Devis Projet d'Aménagement Paysager",
    dueDate: new Date("2024-07-30"),
    thumbnail: "/assets/images/project_thumbnails/project3.jpg",
    address: "789 Allée Verte, Villeurbanne, État, 98765",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 2000,
        quantity: 1,
        tva: 5,
        totalPrice: 2000,
        task: {
          id: "task111",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 5),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Robert Green",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Conception du Jardin",
          description:
            "Conception détaillée du jardin, y compris la sélection des plantes, des aménagements paysagers et des zones de loisirs.",
        },
      },
      {
        id: "item2",
        type: QuoteItemType.TASK,
        unitPrice: 3000,
        quantity: 1,
        tva: 5,
        totalPrice: 3000,
        task: {
          id: "task222",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 10),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Sarah Lee",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Installation de la Terrasse",
          description:
            "Installation d'une terrasse en bois, y compris la préparation du sol, la pose des poutres et la finition de la surface.",
        },
      },
      {
        id: "item3",
        type: QuoteItemType.TASK,
        unitPrice: 3000,
        quantity: 1,
        tva: 5,
        totalPrice: 3000,
        task: {
          id: "task333",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 12),
          priority: Priority.LOW,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Daniel Martinez",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Entretien de la Pelouse",
          description:
            "Entretien régulier de la pelouse, y compris la coupe, la fertilisation et l'arrosage.",
        },
      },
    ],
  },
  {
    id: "quote4",
    projectId: "project4",
    sender: autoEntrepreneur,
    client: client,
    amount: 7000,
    description:
      "Devis pour le développement d'une application mobile pour la gestion des finances personnelles.",
    status: QuoteStatus.PENDING,
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-10-02"),
    title: "Développement Application Mobile",
    dueDate: new Date("2024-11-15"),
    thumbnail: "/assets/images/project_thumbnails/project4.jpg",
    address: "789 Tech Valley, Villeurbanne, État, 12345",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 3000,
        quantity: 1,
        tva: 10,
        totalPrice: 3300,
        task: {
          id: "task41",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 14),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Sam Wright",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Design UX/UI",
          description:
            "Création de wireframes et prototypes interactifs pour l'application.",
        },
      },
      {
        id: "item2",
        type: QuoteItemType.TASK,
        unitPrice: 4000,
        quantity: 1,
        tva: 10,
        totalPrice: 4400,
        task: {
          id: "task42",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 28),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Sophia Lee",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Développement Frontend et Backend",
          description:
            "Construction des interfaces utilisateur et des fonctionnalités backend pour l'application.",
        },
      },
    ],
  },
  {
    id: "quote5",
    projectId: "project5",
    sender: businessOwner,
    client: client,
    amount: 20000,
    description:
      "Devis pour la réalisation d'une campagne marketing numérique incluant SEO, gestion des médias sociaux et publicités payantes.",
    status: QuoteStatus.ACCEPTED,
    createdAt: new Date("2024-09-10"),
    updatedAt: new Date("2024-09-12"),
    title: "Campagne Marketing Numérique",
    dueDate: new Date("2024-11-01"),
    thumbnail: "/assets/images/project_thumbnails/project5.jpg",
    address: "101 Digital Hub, Villeurbanne, État, 54321",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 7000,
        quantity: 1,
        tva: 15,
        totalPrice: 8050,
        task: {
          id: "task51",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 10),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Emma Brown",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Optimisation SEO",
          description:
            "Améliorer la visibilité du site web grâce à des pratiques SEO avancées.",
        },
      },
      {
        id: "item2",
        type: QuoteItemType.TASK,
        unitPrice: 10000,
        quantity: 1,
        tva: 15,
        totalPrice: 11500,
        task: {
          id: "task52",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 30),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Liam Wilson",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Gestion des Médias Sociaux",
          description:
            "Création et gestion de contenu pour les comptes sociaux du client.",
        },
      },
      {
        id: "item3",
        type: QuoteItemType.TASK,
        unitPrice: 3000,
        quantity: 1,
        tva: 15,
        totalPrice: 3450,
        task: {
          id: "task53",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 15),
          priority: Priority.MEDIUM,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Olivia Davis",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Publicité en Ligne",
          description:
            "Configuration et gestion des campagnes Google Ads et Facebook Ads.",
        },
      },
    ],
  },
  {
    id: "quote6",
    projectId: "project6",
    sender: autoEntrepreneur,
    client: client,
    amount: 15000,
    description:
      "Devis pour l'organisation d'un événement professionnel, y compris la gestion logistique, la coordination et la conception visuelle.",
    status: QuoteStatus.PENDING,
    createdAt: new Date("2024-09-25"),
    updatedAt: new Date("2024-09-27"),
    title: "Organisation Événementiel",
    dueDate: new Date("2024-12-01"),
    thumbnail: "/assets/images/project_thumbnails/project6.avif",
    address: "333 Event Plaza, Villeurbanne, État, 67890",
    items: [
      {
        id: "item1",
        type: QuoteItemType.TASK,
        unitPrice: 5000,
        quantity: 1,
        tva: 20,
        totalPrice: 6000,
        task: {
          id: "task61",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 20),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Ethan White",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Planification Logistique",
          description:
            "Réservation des lieux, gestion des prestataires et planification du programme.",
        },
      },
      {
        id: "item2",
        type: QuoteItemType.TASK,
        unitPrice: 8000,
        quantity: 1,
        tva: 20,
        totalPrice: 9600,
        task: {
          id: "task62",
          color: generateRandomColor(),
          endDate: addDays(new Date(), 25),
          priority: Priority.HIGH,
          progress: 0,
          startDate: new Date(),
          status: Status.TODO,
          tags: [],
          teamMembers: [
            {
              fullName: "Mia Clark",
              profilePhoto:
                "/assets/images/avatars/" + generateRandomAvatar() + ".png",
            },
          ],
          title: "Coordination de l'Événement",
          description:
            "Superviser l'installation, coordonner les équipes et assurer le bon déroulement de l'événement.",
        },
      },
    ],
  },
];

export { quotes as sampleQuotes };

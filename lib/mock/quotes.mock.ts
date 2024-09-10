import {
  ClientModel,
  AutoEntrepreneur,
  UserRole,
  BusinessOwner,
  QuoteModel,
  QuoteStatus,
} from "../types/models";

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
  },
];

export { quotes as sampleQuotes };

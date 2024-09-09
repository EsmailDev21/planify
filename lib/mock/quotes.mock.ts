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

// Sample quotes
const quotes: QuoteModel[] = [
  {
    id: "quote1",
    projectId: "project1",
    sender: autoEntrepreneur,
    client: client,
    amount: 5000,
    description: "Quote for website redesign project.",
    status: QuoteStatus.PENDING,
    createdAt: new Date("2024-09-03"),
    updatedAt: new Date("2024-09-05"),
  },
  {
    id: "quote2",
    projectId: "project2",
    sender: businessOwner,
    client: client,
    amount: 12000,
    description: "Quote for mobile app development project.",
    status: QuoteStatus.ACCEPTED,
    createdAt: new Date("2024-08-22"),
  },
  {
    id: "quote3",
    projectId: "project3",
    sender: autoEntrepreneur,
    client: client,
    amount: 8000,
    description: "Quote for marketing campaign.",
    status: QuoteStatus.REJECTED,
    createdAt: new Date("2024-07-15"),
    updatedAt: new Date("2024-07-17"),
  },
];

export { quotes as sampleQuotes };

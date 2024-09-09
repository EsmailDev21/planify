export enum Priority {
  HIGH,
  MEDIUM,
  LOW,
}

export enum Status {
  TODO,
  IN_PROGRESS,
  DONE,
}
export type ProjectModel = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  client: ClientModel;
  tags: string[];
  priority: Priority;
  status: Status;
  dueDate: Date;
  progress: number;
  address: string;
  createdAt: Date;
  updatedAt?: Date;
  teamMembers: TeamMember[];
};
export type TaskModel = {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  priority: Priority;
  status: Status;
  startDate: Date;
  endDate: Date;
  progress: number;
  teamMembers: TeamMember[];
};
export type UserModel = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePhoto?: string;
  role: UserRole;
};

export enum UserRole {
  CUSTOMER,
  ADMIN,
  BUSINESS_OWNER,
  AUTO_ENTERPRENEUR,
}

export type TeamMember = Pick<UserModel, "fullName" | "profilePhoto">;

export type ClientModel = Partial<
  Pick<UserModel, "fullName" | "profilePhoto" | "phoneNumber"> & {
    role: UserRole.CUSTOMER;
  }
>;

export type QuoteModel = {
  id: string;
  projectId: string; // Reference to the ProjectModel
  sender: AutoEntrepreneur | BusinessOwner; // The person who sends the quote
  client: ClientModel; // The recipient of the quote
  amount: number; // Quoted price
  description: string; // Description of the quote
  status: QuoteStatus; // Status of the quote (e.g., PENDING, ACCEPTED, REJECTED)
  createdAt: Date;
  updatedAt?: Date;
};

export enum QuoteStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

// Define AutoEntrepreneur as a specific type of UserModel, highlighting their role
export type AutoEntrepreneur = Pick<
  UserModel,
  "id" | "fullName" | "email" | "profilePhoto" | "phoneNumber"
> & {
  role: UserRole.AUTO_ENTERPRENEUR;
};

export type BusinessOwner = Pick<
  UserModel,
  "id" | "fullName" | "email" | "profilePhoto" | "phoneNumber"
> & {
  role: UserRole.BUSINESS_OWNER;
};

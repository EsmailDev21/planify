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
  color: string;
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
  title: string;
  sender: AutoEntrepreneur | BusinessOwner; // The person who sends the quote
  client: ClientModel; // The recipient of the quote
  amount: number; // Quoted price
  description: string; // Description of the quote
  status: QuoteStatus; // Status of the quote (e.g., PENDING, ACCEPTED, REJECTED)
  createdAt: Date;
  dueDate: Date;
  updatedAt?: Date;
  thumbnail: string;
  address: string;
  items: QuoteItemModel[];
};

export enum QuoteItemType {
  TASK,
  EQUIPMENT,
  PRODUCT,
}
export type QuoteItemModel = {
  id: string; // Unique identifier for the quote item
  type: QuoteItemType; // Specifies the type of item: TASK, PRODUCT, or EQUIPMENT
  task?: TaskModel; // Task details if the item is a task
  product?: ProductModel; // Product details if the item is a product
  equipment?: EquipmentModel; // Equipment details if the item is equipment
  description?: string; // Optional description of the item
  unitPrice: number; // Price per unit of the item
  quantity: number; // Quantity of the item
  tva: number; // Tax rate applied to the item
  totalPrice: number; // Total price for this item (unitPrice * quantity)
};

export type ProductModel = {
  id: string;
  label: string;
};

export type EquipmentModel = {
  id: string;
  label: string;
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

// file  system types
export type FileType = {
  id: string; // Unique identifier
  name: string; // File name
  extension: string; // File extension (e.g., 'jpg', 'pdf', etc.)
  size: number; // File size in bytes
  type: "file"; // Distinguishes files from folders
  createdAt: Date; // Date created
  modifiedAt: Date; // Last modified date
  parentFolderId: string | null;
  content: string | ArrayBuffer | null; // ID of parent folder (null if in root)
};

export type FolderType = {
  id: string; // Unique identifier
  name: string; // Folder name
  type: "folder"; // Distinguishes folders from files
  children: string[]; // Array of IDs for files/folders inside this folder
  createdAt: Date; // Date created
  modifiedAt: Date; // Last modified date
  parentFolderId: string | null; // ID of parent folder (null if root)
};

export type FileSystemEntity = FileType | FolderType;

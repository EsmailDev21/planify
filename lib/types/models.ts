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

enum UserRole {
  CUSTOMER,
  ADMIN,
  BUSINESS_OWNER,
  AUTO_ENTERPRENEUR,
}

export type TeamMember = Pick<UserModel, "fullName" | "profilePhoto">;

export type ClientModel = Partial<
  Pick<UserModel, "fullName" | "profilePhoto" | "phoneNumber">
>;

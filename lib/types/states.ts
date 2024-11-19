import { FileSystemEntity } from "./models";

export interface FileManagerState {
  entities: Record<string, FileSystemEntity>;
  currentFolderId: string | null;
  selectedEntityIds: string[];
  searchQuery: string;
  statusMessage?: string; // Add a status message for errors, success, or warnings
  statusType?: "error" | "success" | "warning";
  cutEntityId: string | null; // Indicate the type of status
}

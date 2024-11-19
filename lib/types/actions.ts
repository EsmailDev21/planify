export enum FileActionType {
  CREATE_FILE = "CREATE_FILE",
  CREATE_FOLDER = "CREATE_FOLDER",
  DELETE = "DELETE",
  RENAME = "RENAME",
  MOVE = "MOVE",
  COPY = "COPY",
  UPLOAD = "UPLOAD",
  DOWNLOAD = "DOWNLOAD",
}

export type FileAction = {
  type: FileActionType; // Type of action
  entityId?: string; // ID of the file/folder the action targets
  newName?: string; // New name for rename actions
  targetFolderId?: string; // Target folder ID for move/copy actions
  files?: File[]; // Files for upload
};

export type FileMetadata = {
  author?: string;
  tags?: string[];
  description?: string;
  lastAccessedAt?: Date;
  permissions?: {
    read: boolean;
    write: boolean;
    delete: boolean;
  };
};

// StatusTypes.ts

export enum FileManagerError {
  FILE_NOT_FOUND = "File not found",
  FOLDER_NOT_FOUND = "Folder not found",
  DUPLICATE_NAME = "An item with this name already exists",
  MOVE_ERROR = "Cannot move file/folder to specified location",
  INVALID_MOVE = "Invalid moving action for the selected item",
  INVALID_ACTION = "Invalid action for the selected item",
  NO_PARENT_FOLDER = "No parent folder exist for the selected item",
  NO_ENTITY_TO_PASTE = "No folder selected to paste into",
}

export enum FileManagerSuccess {
  FILE_CREATED = "File created successfully",
  FOLDER_CREATED = "Folder created successfully",
  FILE_MOVED = "File moved successfully",
  ITEM_MOVED = "Item moved successfully",
  ITEM_DELETED = "Item deleted successfully",
  ITEM_RENAMED = "Item renamed successfully",
  ITEMS_SORTED = "Items sorted successfully",
  ITEM_CUT = "Item was cut successfully",
}

export enum FileManagerWarning {
  UNSAVED_CHANGES = "You have unsaved changes",
  DELETE_CONFIRMATION = "Are you sure you want to delete this item?",
  RESTRICTED_ACTION = "This action is not allowed",
}

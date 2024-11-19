import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileType, FolderType } from "@/lib/types/models";
import { FileManagerError, FileManagerSuccess } from "@/lib/types/metadata";
import { FileManagerState } from "@/lib/types/states";
import { RootState } from "../store";

const initialState: FileManagerState = {
  entities: {}, // Map of files and folders
  currentFolderId: null, // Root folder as initial view
  selectedEntityIds: [], // No files/folders initially selected
  searchQuery: "",
  cutEntityId: "", // No initial search query
};

const fileManagerSlice = createSlice({
  name: "fileManager",
  initialState,
  reducers: {
    createFile: (state, action: PayloadAction<FileType>) => {
      const file = action.payload;
      if (
        Object.values(state.entities).some(
          (entity) => entity.name === file.name
        )
      ) {
        state.statusMessage = FileManagerError.DUPLICATE_NAME;
        state.statusType = "error";
      } else {
        state.entities[file.id] = file;
        if (
          file.parentFolderId &&
          state.entities[file.parentFolderId]?.type === "folder"
        ) {
          (state.entities[file.parentFolderId] as FolderType).children.push(
            file.id
          );
        }
        state.statusMessage = FileManagerSuccess.FILE_CREATED;
        state.statusType = "success";
      }
    },
    createFolder: (state, action: PayloadAction<FolderType>) => {
      const folder = action.payload;
      if (
        Object.values(state.entities).some(
          (entity) => entity.name === folder.name
        )
      ) {
        state.statusMessage = FileManagerError.DUPLICATE_NAME;
        state.statusType = "error";
      } else {
        state.entities[folder.id] = folder;
        if (
          folder.parentFolderId &&
          state.entities[folder.parentFolderId]?.type === "folder"
        ) {
          (state.entities[folder.parentFolderId] as FolderType).children.push(
            folder.id
          );
        }
        state.statusMessage = FileManagerSuccess.FOLDER_CREATED;
        state.statusType = "success";
      }
    },
    deleteEntity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.entities[id]) {
        state.statusMessage = FileManagerError.FILE_NOT_FOUND;
        state.statusType = "error";
        return;
      }

      const entity = state.entities[id];
      if (entity.parentFolderId) {
        const parentFolder = state.entities[
          entity.parentFolderId
        ] as FolderType;
        parentFolder.children = parentFolder.children.filter(
          (childId) => childId !== id
        );
      }

      delete state.entities[id];
      state.statusMessage = FileManagerSuccess.ITEM_DELETED;
      state.statusType = "success";
    },
    renameEntity: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const { id, newName } = action.payload;
      if (!state.entities[id]) {
        state.statusMessage = FileManagerError.FILE_NOT_FOUND;
        state.statusType = "error";
        return;
      }

      if (
        Object.values(state.entities).some((entity) => entity.name === newName)
      ) {
        state.statusMessage = FileManagerError.DUPLICATE_NAME;
        state.statusType = "error";
      } else {
        state.entities[id].name = newName;
        state.statusMessage = FileManagerSuccess.ITEM_RENAMED;
        state.statusType = "success";
      }
    },
    moveEntity: (
      state,
      action: PayloadAction<{ id: string; newParentFolderId: string }>
    ) => {
      const { id, newParentFolderId } = action.payload;
      const entity = state.entities[id];
      if (
        !entity ||
        !state.entities[newParentFolderId] ||
        state.entities[newParentFolderId]?.type !== "folder"
      ) {
        state.statusMessage = FileManagerError.INVALID_MOVE;
        state.statusType = "error";
        return;
      }

      const oldParentFolderId = entity.parentFolderId;
      if (oldParentFolderId) {
        const oldParentFolder = state.entities[oldParentFolderId] as FolderType;
        oldParentFolder.children = oldParentFolder.children.filter(
          (childId) => childId !== id
        );
      }

      entity.parentFolderId = newParentFolderId;
      (state.entities[newParentFolderId] as FolderType).children.push(id);
      state.statusMessage = FileManagerSuccess.ITEM_MOVED;
      state.statusType = "success";
    },
    cutEntity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const entity = state.entities[id];
      if (!entity) {
        state.statusMessage = FileManagerError.FILE_NOT_FOUND;
        state.statusType = "error";
        return;
      }

      state.cutEntityId = id; // Store the cut entity for later pasting
      state.statusMessage = FileManagerSuccess.ITEM_CUT;
      state.statusType = "success";
    },

    pasteEntity: (state, action: PayloadAction<string>) => {
      const newParentFolderId = action.payload;
      const cutEntityId = state.cutEntityId;

      if (!cutEntityId) {
        state.statusMessage = FileManagerError.NO_ENTITY_TO_PASTE;
        state.statusType = "error";
        return;
      }

      const entity = state.entities[cutEntityId];
      if (!entity || state.entities[newParentFolderId]?.type !== "folder") {
        state.statusMessage = FileManagerError.INVALID_MOVE;
        state.statusType = "error";
        return;
      }

      const oldParentFolderId = entity.parentFolderId;
      if (oldParentFolderId) {
        const oldParentFolder = state.entities[oldParentFolderId] as FolderType;
        oldParentFolder.children = oldParentFolder.children.filter(
          (childId) => childId !== cutEntityId
        );
      }

      entity.parentFolderId = newParentFolderId;
      (state.entities[newParentFolderId] as FolderType).children.push(
        cutEntityId
      );
      state.cutEntityId = null; // Clear the cut entity after pasting

      state.statusMessage = FileManagerSuccess.ITEM_MOVED;
      state.statusType = "success";
    },
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },
    toggleSelectEntity: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedEntityIds.includes(id)) {
        state.selectedEntityIds = state.selectedEntityIds.filter(
          (selectedId) => selectedId !== id
        );
      } else {
        state.selectedEntityIds.push(id);
      }
    },
    clearSelectedEntities: (state) => {
      state.selectedEntityIds = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    goToParentFolder: (state) => {
      const currentFolder = state.entities[
        state.currentFolderId || ""
      ] as FolderType;
      if (currentFolder && currentFolder.parentFolderId) {
        state.currentFolderId = currentFolder.parentFolderId;
      } else {
        state.statusMessage = FileManagerError.NO_PARENT_FOLDER;
        state.statusType = "warning";
      }
    },
    setStatus: (
      state,
      action: PayloadAction<{
        message: string;
        type: "error" | "success" | "warning";
      }>
    ) => {
      state.statusMessage = action.payload.message;
      state.statusType = action.payload.type;
    },
    sortEntities: (
      state,
      action: PayloadAction<{
        sortBy: "name" | "dateCreated" | "type";
        order: "asc" | "desc";
      }>
    ) => {
      const { sortBy, order } = action.payload;
      const currentFolderId = state.currentFolderId;

      if (!currentFolderId || !(currentFolderId in state.entities)) {
        state.statusMessage = FileManagerError.FOLDER_NOT_FOUND;
        state.statusType = "error";
        return;
      }

      const currentFolder = state.entities[currentFolderId] as FolderType;
      currentFolder.children.sort((a, b) => {
        const entityA = state.entities[a];
        const entityB = state.entities[b];

        if (!entityA || !entityB) return 0;

        let comparison = 0;

        switch (sortBy) {
          case "name":
            comparison = entityA.name.localeCompare(entityB.name);
            break;
          case "dateCreated":
            comparison =
              (entityA.createdAt.getTime() || 0) -
              (entityB.createdAt.getTime() || 0);
            break;
          case "type":
            comparison = entityA.type.localeCompare(entityB.type);
            break;
        }

        return order === "asc" ? comparison : -comparison;
      });

      state.statusMessage = FileManagerSuccess.ITEMS_SORTED;
      state.statusType = "success";
    },
  },
});

export const {
  createFile,
  createFolder,
  deleteEntity,
  renameEntity,
  moveEntity,
  setCurrentFolder,
  toggleSelectEntity,
  clearSelectedEntities,
  setSearchQuery,
  goToParentFolder,
  setStatus,
  sortEntities,
  cutEntity,
  pasteEntity,
} = fileManagerSlice.actions;

export const fileManagerReducer = fileManagerSlice.reducer;

// Selectors
export const selectEntities = (state: RootState) => state.fileManager.entities;
export const selectCurrentFolderId = (state: RootState) =>
  state.fileManager.currentFolderId;
export const selectSelectedEntityIds = (state: RootState) =>
  state.fileManager.selectedEntityIds;
export const selectSearchQuery = (state: RootState) =>
  state.fileManager.searchQuery;
export const selectStatusMessage = (state: RootState) =>
  state.fileManager.statusMessage;
export const selectStatusType = (state: RootState) =>
  state.fileManager.statusType;

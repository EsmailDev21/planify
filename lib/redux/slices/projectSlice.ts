// projectSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProjectModel } from "@/lib/types/models";
import { sampleProjects } from "@/lib/mock/projects.mock";
type ProjectState = {
  projects: ProjectModel[];
  filters: {
    status: string;
    priority: string;
    tags: string[];
    dueDate: Date | null;
    search: string;
  };
};

// Initial state
const initialState: ProjectState = {
  projects: sampleProjects,
  filters: {
    status: "",
    priority: "",
    tags: [],
    dueDate: null,
    search: "",
  },
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<ProjectModel>) {
      state.projects = [action.payload, ...state.projects];
    },
    updateProject(state, action: PayloadAction<ProjectModel>) {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    setFilters(state, action: PayloadAction<ProjectState["filters"]>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = {
        status: "",
        priority: "",
        tags: [],
        dueDate: null,
        search: "",
      };
    },
  },
});

export const {
  addProject,
  deleteProject,
  updateProject,
  setFilters,
  clearFilters,
} = projectSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export default projectSlice.reducer;

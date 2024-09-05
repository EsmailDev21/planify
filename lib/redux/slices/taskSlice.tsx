// taskSlice.ts
import { GanttTaskProps } from "@/components/app/tasks/views/GanttTask.component";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type TaskState = {
  tasks: GanttTaskProps[];
  filters: {
    status: string;
    priority: string;
    tags: string[];
    startDate: Date | null;
    endDate: Date | null;
    search: string;
  };
};

// Initial state
const initialState: TaskState = {
  tasks: [],
  filters: {
    status: "",
    priority: "",
    tags: [],
    startDate: null,
    endDate: null,
    search: "",
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<GanttTaskProps>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    updateTask(state, action: PayloadAction<GanttTaskProps>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<TaskState["filters"]>) {
      state.filters = action.payload;
    },
    clearFilters(state) {
      state.filters = {
        status: "",
        priority: "",
        tags: [],
        startDate: null,
        endDate: null,
        search: "",
      };
    },
  },
});

export const { addTask, updateTask, deleteTask, setFilters, clearFilters } =
  taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;

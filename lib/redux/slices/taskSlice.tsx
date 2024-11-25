// taskSlice.ts
import { GanttTaskProps } from "@/components/app/tasks/views/GanttTask.component";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TaskModel } from "@/lib/types/models";
type TaskState = {
  tasks: TaskModel[];
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
    addTask(state, action: PayloadAction<TaskModel>) {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; updates: Partial<TaskModel> }>
    ) {
      const { id, updates } = action.payload;

      // Find the task by ID
      const taskIndex = state.tasks.findIndex((task) => task.id === id);

      if (taskIndex !== -1) {
        // Update the task directly if found
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      } else {
        // If the task is not found, check subtasks
        state.tasks.forEach((task) => {
          if (task.subtasks) {
            // Ensure subtasks exist before proceeding
            const subtaskIndex = task.subtasks.findIndex(
              (subtask) => subtask.id === id
            );
            if (subtaskIndex !== -1) {
              // Update the specific subtask
              task.subtasks[subtaskIndex] = {
                ...task.subtasks[subtaskIndex],
                ...updates,
              };
            }
          }
        });
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

// store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    projects: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

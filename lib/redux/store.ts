// store.ts
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
import imagesReducer from "./slices/imageGallerySlice";
import QuoteReducer from "./slices/quoteSlice";
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    projects: projectReducer,
    images: imagesReducer,
    quotes: QuoteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

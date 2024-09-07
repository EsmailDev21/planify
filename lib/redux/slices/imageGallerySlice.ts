import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  images: string[]; // Array to hold image URLs
}

const initialState: ImageState = {
  images: [],
};

const imageGallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.images.push(action.payload); // Add new image URL to state
    },
  },
});

// Export actions and reducer
export const { addImage } = imageGallerySlice.actions;
export default imageGallerySlice.reducer;

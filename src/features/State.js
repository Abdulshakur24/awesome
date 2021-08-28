import { createSlice } from "@reduxjs/toolkit";

const determine = (arrayOrObject) => {
  if (Array.isArray(arrayOrObject)) return arrayOrObject;
  return [];
};

export const stateSlicer = createSlice({
  name: "counter",
  initialState: {
    images: [],
    videos: [],
  },
  reducers: {
    createImages: (state, action) => {
      state.images = determine(action.payload);
    },
    addImage: (state, action) => {
      state.images = [...state.images, action.payload];
    },
    removeImage: (state, action) => {
      const id = action.payload;
      state.images = state.images.filter((object) => object.id !== id);
    },
    clearAllImages: (state) => {
      state.images.length = 0;
    },
    createVideos: (state, action) => {
      state.videos = determine(action.payload);
    },
    addVideo: (state, action) => {
      state.videos = [...state.videos, action.payload];
    },
    removeVideo: (state, action) => {
      const id = action.payload;
      state.videos = state.videos.filter((object) => object.id !== id);
    },
    clearAllVideos: (state) => {
      state.videos.length = 0;
    },
  },
});

export const {
  createImages,
  addImage,
  removeImage,
  clearAllImages,
  createVideos,
  addVideo,
  removeVideo,
} = stateSlicer.actions;

export default stateSlicer.reducer;

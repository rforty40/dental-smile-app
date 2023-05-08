import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    isSidebarOpen: false,
    pageActive: "",
  },

  reducers: {
    onChangeSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    onChangePage: (state, { payload }) => {
      state.pageActive = payload;
    },
  },
});

export const { onChangeSidebar, onChangePage } = uiSlice.actions;

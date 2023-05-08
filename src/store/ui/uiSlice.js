import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    pageActive: "",
    isSidebarOpen: false,
    isConfirmDeleteOpen: false,
  },

  reducers: {
    onChangeSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    onChangePage: (state, { payload }) => {
      state.pageActive = payload;
    },

    onChangeConfirmDelete: (state, { payload }) => {
      state.isConfirmDeleteOpen = payload;
    },
  },
});

export const { onChangeSidebar, onChangePage, onChangeConfirmDelete } =
  uiSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    isSidebarOpen: false,
    pageActive: "",
    isHovereable: false,
  },

  reducers: {
    onChangeSidebar: (state, { payload }) => {
      state.isSidebarOpen = payload;
    },
    onChangePage: (state, { payload }) => {
      state.pageActive = payload;
    },
    onChangeHover: (state, { payload }) => {
      state.isHovereable = payload;
    },
  },
});

export const { onChangeSidebar, onChangePage, onChangeHover } = uiSlice.actions;

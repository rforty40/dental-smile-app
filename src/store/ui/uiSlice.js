import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",

  initialState: {
    pageActive: "",
    isSidebarOpen: false,
    isConfirmDeleteOpen: false,
    // dataActiva: {},
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

    // onLoadDataActiva: (state, { payload }) => {
    //   state.dataActiva = {
    //     ...payload,
    //   };
    // },
  },
});

export const {
  onChangeSidebar,
  onChangePage,
  onChangeConfirmDelete,
  // onLoadDataActiva,
} = uiSlice.actions;

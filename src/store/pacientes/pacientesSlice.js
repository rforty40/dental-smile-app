import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    isFormPacOpen: false,
  },

  reducers: {
    openFormPac: (state) => {
      state.isFormPacOpen = true;
    },
    closeFormPac: (state) => {
      state.isFormPacOpen = false;
    },
  },
});

export const { openFormPac, closeFormPac } = pacientesSlice.actions;

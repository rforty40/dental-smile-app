import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    isFormPacOpen: false,
    titleForm: "",
    pacienteActivo: {
      nombre: "Juan Peréz",
      cedula: "1394342433",
    },
  },

  reducers: {
    changeFormPacOpen: (state, { payload }) => {
      state.isFormPacOpen = payload;
    },
    // closeFormPac: (state) => {
    //   state.isFormPacOpen = false;
    // },
    changeTitleForm: (state, { payload }) => {
      state.titleForm = payload;
    },
  },
});

export const { changeFormPacOpen, changeTitleForm } = pacientesSlice.actions;

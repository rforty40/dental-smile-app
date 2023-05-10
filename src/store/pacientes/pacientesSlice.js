import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    isFormPacOpen: false,
    titleForm: "",
    pacienteActivo: {},
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

    onLoadPacActivo: (state, { payload }) => {
      state.pacienteActivo = {
        ...payload,
      };
    },
  },
});

export const { changeFormPacOpen, changeTitleForm, onLoadPacActivo } =
  pacientesSlice.actions;

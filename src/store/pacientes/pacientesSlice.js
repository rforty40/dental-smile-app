import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    isFormPacOpen: false,
    titleForm: "",
    pacienteActivo: {},
    pacientesList: [],
    registerError: true,
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

    onLoadPacientesList: (state, { payload = [] }) => {
      state.pacientesList = payload;
    },

    changeRegisterError: (state, { payload }) => {
      state.registerError = payload;
    },

    onSavePaciente: (state, { payload = [] }) => {
      console.log("Payload in pacienteSlice", payload);
      state.pacientesList.push(payload);
    },
  },
});

export const {
  changeFormPacOpen,
  changeTitleForm,
  onLoadPacActivo,
  onLoadPacientesList,
  onSavePaciente,
  changeRegisterError,
} = pacientesSlice.actions;

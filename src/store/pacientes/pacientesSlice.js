import { createSlice } from "@reduxjs/toolkit";

export const pacientesSlice = createSlice({
  name: "pacientes",

  initialState: {
    isFormPacOpen: false,
    titleForm: "",
    pacienteActivo: {},
    pacientesList: [],
    errorRegMessage: { msg: "", error: "" },
  },

  reducers: {
    changeFormPacOpen: (state, { payload }) => {
      state.isFormPacOpen = payload;
    },

    changeTitleForm: (state, { payload }) => {
      state.titleForm = payload;
    },

    onLoadPacActivo: (state, { payload }) => {
      state.pacienteActivo = {
        ...payload,
      };
    },

    onLoadPacientesList: (state, { payload }) => {
      state.pacientesList = payload;
    },

    onSavePaciente: (state, { payload }) => {
      state.pacientesList.push(payload);
    },

    onUpdatePaciente: (state, { payload }) => {
      state.pacientesList = state.pacientesList.map((paciente) => {
        if (paciente.id === payload.id) {
          return payload;
        }

        return paciente;
      });
    },

    onDeletePaciente: (state, { payload }) => {
      if (state.pacienteActivo && payload.length === 0) {
        state.pacientesList = state.pacientesList.filter(
          (paciente) => paciente.id !== state.pacienteActivo.id
        );
        state.pacienteActivo = null;
      } else {
        state.pacientesList = state.pacientesList.filter(
          (paciente) => !payload.includes(paciente.id)
        );
        state.pacienteActivo = null;
      }
    },

    changeRegisterError: (state, { payload }) => {
      state.errorRegMessage = payload;
    },

    clearErrorMessage: (state) => {
      state.errorRegMessage = { msg: "", error: "" };
    },

    // changeDeleteError: (state, { payload }) => {
    //   state.errorRegMessage = payload;
    // },
  },
});

export const {
  changeFormPacOpen,
  changeTitleForm,
  onLoadPacActivo,
  onLoadPacientesList,
  onSavePaciente,
  changeRegisterError,
  clearErrorMessage,
  onUpdatePaciente,
  onDeletePaciente,
} = pacientesSlice.actions;

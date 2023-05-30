import { createSlice } from "@reduxjs/toolkit";

export const consultasSlice = createSlice({
  name: "consultas",

  initialState: {
    consultaActiva: null,
    consultasList: [],
    errorLoadConsultas: null,
  },

  reducers: {
    onSetActivaConsulta: (state, { payload }) => {
      state.consultaActiva = payload;
    },

    onLoadConsultasList: (state, { payload }) => {
      state.consultasList = payload;
    },

    changeErrorLoadConsultas: (state, { payload }) => {
      state.errorLoadConsultas = payload;
    },
  },
});

export const {
  onSetActivaConsulta,
  onLoadConsultasList,
  changeErrorLoadConsultas,
} = consultasSlice.actions;

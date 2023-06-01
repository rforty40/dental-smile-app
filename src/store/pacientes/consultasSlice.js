import { createSlice } from "@reduxjs/toolkit";

export const consultasSlice = createSlice({
  name: "consultas",

  initialState: {
    //Listar consultas
    consultaActiva: null,
    consultasList: [],
    errorLoadConsultas: null,
    //Modal Form
    stateOpenFormCons: false,
    titleFormConsulta: "",
    errorMsgRegCons: { msg: "", error: "" },
    stateOpenDelCons: false,
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

    onChangeOpenFormCons: (state, { payload }) => {
      state.stateOpenFormCons = payload;
    },

    onChangeTitleFormCons: (state, { payload }) => {
      state.titleFormConsulta = payload;
    },

    onChangeOpenDelCons: (state, { payload }) => {
      state.stateOpenDelCons = payload;
    },

    changeRegisterErrorCons: (state, { payload }) => {
      state.errorMsgRegCons = payload;
    },

    clearErrorMessageCons: (state) => {
      state.errorMsgRegCons = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActivaConsulta,
  onLoadConsultasList,
  changeErrorLoadConsultas,
  onChangeOpenFormCons,
  onChangeTitleFormCons,
  onChangeOpenDelCons,
  changeRegisterErrorCons,
  clearErrorMessageCons,
} = consultasSlice.actions;

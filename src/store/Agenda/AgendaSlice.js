import { createSlice } from "@reduxjs/toolkit";

export const agendaSlice = createSlice({
  name: "agenda",

  initialState: {
    citasList: [],
    activeCita: null,
    stateOpenFormAgenda: false,
    titleFormAgenda: "",
    errorRegCiteMessage: { msg: "", error: "" },

    stateOpenCiteView: false,
  },

  reducers: {
    onChangeOpenFormAgenda: (state, { payload }) => {
      state.stateOpenFormAgenda = payload;
    },

    onChangeOpenViewCite: (state, { payload }) => {
      state.stateOpenCiteView = payload;
    },

    onChangeTitleFormAgenda: (state, { payload }) => {
      state.titleFormAgenda = payload;
    },

    onSetActiveCita: (state, { payload }) => {
      state.activeCita = payload;
    },

    onLoadCitas: (state, { payload }) => {
      state.citasList = payload;
    },

    onSaveCita: (state, { payload }) => {
      state.citasList.push(payload);
    },

    onUpdateCita: (state, { payload }) => {
      state.citasList = state.citasList.map((cita) => {
        if (
          cita.fecha_cita === payload.fecha_cita &&
          cita.hora_inicio === payload.hora_inicio
        ) {
          return payload;
        }
        return cita;
      });
    },

    changeRegisterCiteError: (state, { payload }) => {
      state.errorRegCiteMessage = payload;
    },

    clearErrorCiteMessage: (state) => {
      state.errorRegCiteMessage = { msg: "", error: "" };
    },
  },
});

export const {
  onChangeOpenFormAgenda,
  onChangeOpenViewCite,
  onChangeTitleFormAgenda,
  onSetActiveCita,
  onLoadCitas,
  onSaveCita,
  onUpdateCita,
  changeRegisterCiteError,
  clearErrorCiteMessage,
} = agendaSlice.actions;

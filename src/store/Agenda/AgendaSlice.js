import { createSlice } from "@reduxjs/toolkit";

export const agendaSlice = createSlice({
  name: "agenda",

  initialState: {
    citasList: [],
    activeCita: {},
    stateOpenFormAgenda: false,
    titleFormAgenda: "",
    errorRegCiteMessage: { msg: "", error: "" },
  },

  reducers: {
    onChangeOpenFormAgenda: (state, { payload }) => {
      state.stateOpenFormAgenda = payload;
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

    onDeleteCita: (state) => {
      state.citasList = state.citasList.filter(
        (cita) =>
          cita.fecha_cita !== state.activeCita.fecha_cita ||
          cita.hora_inicio !== state.activeCita.hora_inicio
      );
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
  onChangeTitleFormAgenda,
  onSetActiveCita,
  onLoadCitas,
  onSaveCita,
  onUpdateCita,
  onDeleteCita,
  changeRegisterCiteError,
  clearErrorCiteMessage,
} = agendaSlice.actions;

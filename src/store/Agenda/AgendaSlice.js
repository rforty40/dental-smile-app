import { createSlice } from "@reduxjs/toolkit";

export const agendaSlice = createSlice({
  name: "agenda",

  initialState: {
    citas: [],
    activeCita: null,
    errorRegCiteMessage: { msg: "", error: "" },
  },

  reducers: {
    onSetActiveCita: (state, { payload }) => {
      state.activeCita = payload;
    },

    onLoadCitas: (state, { payload }) => {
      state.citas = payload;
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
  onSetActiveCita,
  onLoadCitas,
  changeRegisterCiteError,
  clearErrorCiteMessage,
} = agendaSlice.actions;

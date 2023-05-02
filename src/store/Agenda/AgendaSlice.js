import { createSlice } from "@reduxjs/toolkit";

export const agendaSlice = createSlice({
  name: "agenda",

  initialState: {
    isLoadingCitas: true,
    citas: [],
    activeCita: null,
  },

  reducers: {
    onSetActiveCita: (state, { payload }) => {
      state.activeCita = payload;
    },
  },
});

export const { onSetActiveCita } = agendaSlice.actions;

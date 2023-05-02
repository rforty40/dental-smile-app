import { configureStore } from "@reduxjs/toolkit";
import { agendaSlice, dashboardSlice, pacientesSlice, uiSlice } from "./";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    agenda: agendaSlice.reducer,
    pacientes: pacientesSlice.reducer,
    dashboard: dashboardSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

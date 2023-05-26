import { configureStore } from "@reduxjs/toolkit";
import {
  agendaSlice,
  dashboardSlice,
  dataSlice,
  pacientesSlice,
  tipoConsSlice,
  tiposPagoSlice,
  uiSlice,
} from "./";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    agenda: agendaSlice.reducer,
    pacientes: pacientesSlice.reducer,
    dashboard: dashboardSlice.reducer,
    tipoPago: tiposPagoSlice.reducer,
    tipoCons: tipoConsSlice.reducer,
    dataGlobal: dataSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

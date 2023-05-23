import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    //paneles admin
    listPacientesPanel: [],
    listConsultasPanel: [],
    listProcedimientosPanel: [],

    //ganancias
    listGastosPanel: [],
    listIngresoPanel: [],
    totallistGastos: null,
    totallistIngreso: null,
  },

  reducers: {
    //lista del admin dashboard solo lectura
    onLoadListPacPanel: (state, { payload }) => {
      state.listPacientesPanel = payload;
    },
    onLoadListConsPanel: (state, { payload }) => {
      state.listConsultasPanel = payload;
    },
    onLoadListProcedPanel: (state, { payload }) => {
      state.listProcedimientosPanel = payload;
    },
    onLoadListGastosPanel: (state, { payload }) => {
      state.listGastosPanel = payload;
    },
    onLoadListIngresoPanel: (state, { payload }) => {
      state.listIngresoPanel = payload;
    },
    onLoadListTotalGastos: (state, { payload }) => {
      state.totallistGastos = payload;
    },
    onLoadListTotalIngreso: (state, { payload }) => {
      state.totallistIngreso = payload;
    },
  },
});

export const {
  onLoadListPacPanel,
  onLoadListConsPanel,
  onLoadListProcedPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,
} = dashboardSlice.actions;

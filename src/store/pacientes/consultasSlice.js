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
    signosVitales: null,

    //examenEstomagnatico
    examenesList: [],
    examenActivo: null,

    //enfermedades CIE
    enfermedadesCieList: [],
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

    /*
    signos vitales
    */
    onSetActiveSignVit: (state, { payload }) => {
      state.signosVitales = payload;
    },

    /* 
  exmanes estomatognaticos
   */
    onLoadExamenesList: (state, { payload }) => {
      state.examenesList = payload;
    },
    onSetActiveExamen: (state, { payload }) => {
      state.examenActivo = payload;
    },
    onSaveExamen: (state, { payload }) => {
      state.examenesList.push(payload);
    },
    onUpdateExamen: (state, { payload }) => {
      state.examenesList = state.examenesList.map((examen) => {
        if (examen.id === payload.id) {
          return payload;
        }

        return examen;
      });
    },
    onDeleteExamen: (state, { payload }) => {
      if (payload.length === 0) {
        state.examenesList = state.examenesList.filter(
          (examen) => examen.id !== state.examenActivo.id
        );
      } else {
        state.examenesList = state.examenesList.filter(
          (examen) => !payload.includes(examen.id)
        );
      }
      state.examenActivo = null;
    },

    /*
    enfermedadesCIE
     */
    onLoadEnfermedadesCieList: (state, { payload }) => {
      state.enfermedadesCieList = payload;
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

  //signos vitales
  onSetActiveSignVit,

  //examenes estomatognatico
  onLoadExamenesList,
  onSetActiveExamen,
  onSaveExamen,
  onUpdateExamen,
  onDeleteExamen,

  //enfermedades
  onLoadEnfermedadesCieList,
} = consultasSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const procedSlice = createSlice({
  name: "procedSlice",
  //
  initialState: {
    procedList: [],
    procedActivo: null,
    errorMsgRegProced: { msg: "", error: "" },
  },
  reducers: {
    onSetActiveProced: (state, { payload }) => {
      state.procedActivo = payload;
    },

    onLoadProcedList: (state, { payload }) => {
      state.procedList = payload;
    },

    onSaveProced: (state, { payload }) => {
      state.procedList.push(payload);
    },

    onUpdateProced: (state, { payload }) => {
      state.procedList = state.procedList.map((proced) => {
        if (proced.id === payload.id) {
          return payload;
        }

        return proced;
      });
    },

    onDeleteProced: (state, { payload }) => {
      if (payload.length === 0) {
        state.procedList = state.procedList.filter(
          (proced) => proced.id !== state.procedActivo.id
        );
      } else {
        state.procedList = state.procedList.filter(
          (proced) => !payload.includes(proced.id)
        );
      }
      state.procedActivo = null;
    },

    onChangeRegErrProced: (state, { payload }) => {
      state.errorMsgRegProced = payload;
    },

    clearErrorProcedMsg: (state) => {
      state.errorMsgRegProced = { msg: "", error: "" };
    },
  },
});

export const {
  onSetActiveProced,
  onLoadProcedList,
  onSaveProced,
  onUpdateProced,
  onDeleteProced,
  onChangeRegErrProced,
  clearErrorProcedMsg,
} = procedSlice.actions;

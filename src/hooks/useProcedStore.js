import { useDispatch, useSelector } from "react-redux";
import {
  createProcedimiento,
  deleteProcedimiento,
  getAllProcedimientos,
  updateProcedimiento,
} from "../api/dashboard.api";
import {
  clearErrorProcedMsg,
  onChangeRegErrProced,
  onDeleteProced,
  onLoadProcedList,
  onSaveProced,
  onSetActiveProced,
  onUpdateProced,
} from "../store";
import {
  comprobarErrorProced,
  formatearDataProcedToBD,
  formatearDataProcedToTable,
} from "../dashboard/helpers";

//
//
//
//
//

export const useProcedStore = () => {
  //

  const dispatch = useDispatch();

  const { procedList, procedActivo, errorMsgRegProced } = useSelector(
    (state) => state.procedimientos
  );

  //funciones
  const startLoadProcedList = async () => {
    try {
      const { data } = await getAllProcedimientos();
      // console.log(data);
      dispatch(onLoadProcedList(formatearDataProcedToTable(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changeDataProced = (dataProced) => {
    dispatch(onSetActiveProced(dataProced));
  };

  const startSavingProced = async (dataProced) => {
    dispatch(clearErrorProcedMsg());
    try {
      console.log(dataProced);
      console.log(formatearDataProcedToBD(dataProced));

      if (dataProced.id) {
        //actualizar
        const { data } = await updateProcedimiento(
          dataProced.id,
          formatearDataProcedToBD(dataProced)
        );
        // console.log(data);
        dispatch(onUpdateProced(formatearDataProcedToTable([data])[0]));
        dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createProcedimiento(
          formatearDataProcedToBD(dataProced)
        );
        dispatch(onSaveProced(formatearDataProcedToTable([data])[0]));
        dispatch(onSetActiveProced(formatearDataProcedToTable([data])[0]));
      }

      dispatch(onChangeRegErrProced({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrProced({
          msg: "Hay errores",
          error: comprobarErrorProced(error.response.data.message),
        })
      );
    }
  };

  const startDeletingProced = async (arrIdProced = []) => {
    try {
      if (arrIdProced.length === 0) {
        await deleteProcedimiento(procedActivo.id);
      } else {
        for (const i of arrIdProced) {
          await deleteProcedimiento(i);
        }
      }
      dispatch(onDeleteProced(arrIdProced));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    procedList,
    procedActivo,
    errorMsgRegProced,
    //* Métodos
    startLoadProcedList,
    changeDataProced,
    startSavingProced,
    startDeletingProced,
  };
};

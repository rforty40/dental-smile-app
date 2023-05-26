import { useDispatch, useSelector } from "react-redux";
import {
  createTipoPago,
  getTipoDePago,
  updateTipoPago,
} from "../api/dashboard.api";
import {
  clearErrorTipPagoMsg,
  onChangeRegErrTipPago,
  onLoadTipoPagosList,
  onSaveTipoPago,
  onSetActiveTipoPago,
  onUpdateTipoPago,
} from "../store";
import {
  comprobarErrorTipPago,
  formatearDataTipPagoToBD,
  formatearDataTipPagoToTable,
} from "../dashboard/helpers";

export const useTipPagoStore = () => {
  const dispatch = useDispatch();

  const { tipoPagosList, tipoPagoActivo, errorMsgRegTipoPago } = useSelector(
    (state) => state.tipoPago
  );

  //funciones
  const startLoadTipPagoList = async (tipoPago, id) => {
    try {
      const { data } = await getTipoDePago(tipoPago, id);
      console.log(data);
      dispatch(onLoadTipoPagosList(formatearDataTipPagoToTable(data)));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const changeDataTipPago = (dataTipPago) => {
    dispatch(onSetActiveTipoPago(dataTipPago));
  };

  const startSavingTipPago = async (dataTipPago) => {
    dispatch(clearErrorTipPagoMsg());
    try {
      if (dataTipPago.id) {
        //actualizar
        const { data } = await updateTipoPago(
          dataTipPago.id,
          formatearDataTipPagoToBD(dataTipPago)
        );

        // console.log(data);
        dispatch(onUpdateTipoPago(formatearDataTipPagoToTable([data])[0]));
        dispatch(onSetActiveTipoPago(formatearDataTipPagoToTable([data])[0]));
        //
      } else {
        //registrar
        const { data } = await createTipoPago(
          formatearDataTipPagoToBD(dataTipPago)
        );
        dispatch(onSaveTipoPago(formatearDataTipPagoToTable([data])[0]));
        dispatch(onSetActiveTipoPago(formatearDataTipPagoToTable([data])[0]));
      }

      dispatch(onChangeRegErrTipPago({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        onChangeRegErrTipPago({
          msg: "Hay errores",
          error: comprobarErrorTipPago(error.response.data.message),
        })
      );
    }
  };

  return {
    //* Propiedades
    tipoPagosList,
    tipoPagoActivo,
    errorMsgRegTipoPago,
    //* Métodos
    startLoadTipPagoList,
    changeDataTipPago,
    startSavingTipPago,
  };
};

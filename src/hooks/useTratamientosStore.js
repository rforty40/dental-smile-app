import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorLoadTratamientos,
  onDeleteTratam,
  onLoadTratamientosList,
  onSetActiveTratam,
} from "../store";
import { deleteTratamiento, getTratamientos } from "../api/tratamientos.api";

//
//

export const useTratamientosStore = () => {
  //

  const dispatch = useDispatch();

  const {
    tratamientosList,
    tratamActivo,
    errorLoadTratamientos,
    consultaActiva,
  } = useSelector((state) => state.consultas);

  //

  const changeDataTratam = (tratam) => {
    dispatch(onSetActiveTratam(tratam));
  };

  const startLoadTratamientos = async () => {
    try {
      console.log(consultaActiva);
      const { data } = await getTratamientos(consultaActiva.id_consulta);
      console.log(data);
      dispatch(onLoadTratamientosList(data));
      dispatch(changeErrorLoadTratamientos(null));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(changeErrorLoadTratamientos(error.response.data.message));
    }
  };

  const startDeletingTratamiento = async () => {
    try {
      await deleteTratamiento(tratamActivo.id_tratam);
      dispatch(onDeleteTratam());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  //
  return {
    //* Propiedades
    tratamientosList,
    tratamActivo,
    errorLoadTratamientos,

    //* Métodos
    changeDataTratam,
    startLoadTratamientos,
    startDeletingTratamiento,
  };
};

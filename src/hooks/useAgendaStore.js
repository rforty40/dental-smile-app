import { useDispatch, useSelector } from "react-redux";
import {
  changeRegisterCiteError,
  clearErrorCiteMessage,
  onChangeOpenFormAgenda,
  onChangeTitleFormAgenda,
  onLoadCitas,
  onSaveCita,
  onSetActiveCita,
  onUpdateCita,
  onDeleteCita,
} from "../store";
import {
  createCita,
  deleteCita,
  getAllCites,
  updateCita,
} from "../api/agenda.api";
import {
  comprobarErrorCite,
  formatearDataCiteToBD,
  formatedDataCite,
} from "../agenda/helpers/formatedDataCite";

//
//

export const useAgendaStore = () => {
  //

  const dispatch = useDispatch();

  const {
    stateOpenFormAgenda,

    titleFormAgenda,
    citasList,
    activeCita,
    errorRegCiteMessage,
  } = useSelector((state) => state.agenda);

  const changeStateFormAgenda = (flag) => {
    dispatch(onChangeOpenFormAgenda(flag));
  };

  const changeTitleFormAgenda = (flag) => {
    dispatch(onChangeTitleFormAgenda(flag));
  };

  const changeDataCite = (dataCite) => {
    dispatch(onSetActiveCita(dataCite));
  };

  const startLoadCites = async () => {
    try {
      const { data } = await getAllCites();
      dispatch(onLoadCitas(formatedDataCite(data)));
    } catch (error) {
      console.log("Error cargando lista de citas");
      console.log(error);
    }
  };

  const startSavingCita = async (dataCite) => {
    dispatch(clearErrorCiteMessage());

    try {
      //registrando al backend
      const { data } = await createCita(formatearDataCiteToBD(dataCite));

      //guardando y actualizando el store
      console.log(data);
      dispatch(onSaveCita(formatedDataCite([data])[0]));
      dispatch(onSetActiveCita(formatedDataCite([data])[0]));

      //actualizar errores
      dispatch(changeRegisterCiteError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterCiteError({
          msg: "Hay errores",
          error: comprobarErrorCite(error.response.data.message),
        })
      );
    } finally {
      startLoadCites();
    }
  };

  const startUpdatingCita = async (fechaCite, horaIni, dataCite) => {
    dispatch(clearErrorCiteMessage());

    try {
      //registrando al backend
      const { data } = await updateCita(
        fechaCite.replaceAll("/", "-"),
        horaIni,
        formatearDataCiteToBD(dataCite)
      );

      //guardando y actualizando el store
      // console.log(data);
      dispatch(onUpdateCita(formatedDataCite([data])[0]));
      dispatch(onSetActiveCita(formatedDataCite([data])[0]));

      //actualizar errores
      dispatch(changeRegisterCiteError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterCiteError({
          msg: "Hay errores",
          error: comprobarErrorCite(error.response.data.message),
        })
      );
    } finally {
      startLoadCites();
    }
  };

  const startDeletingCite = async () => {
    try {
      await deleteCita(
        activeCita.fecha_cita.replaceAll("/", "-"),
        activeCita.hora_inicio
      );

      dispatch(onDeleteCita());
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return {
    //* Propiedades
    citasList,
    activeCita,
    errorRegCiteMessage,
    stateOpenFormAgenda,
    titleFormAgenda,

    //* Métodos
    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeDataCite,
    startLoadCites,
    startSavingCita,
    startUpdatingCita,
    startDeletingCite,
  };
};

import { useDispatch, useSelector } from "react-redux";
import {
  changeFormPacOpen,
  changeRegisterError,
  changeTitleForm,
  clearErrorMessage,
  onDeletePaciente,
  onLoadPacActivo,
  onLoadPacientesList,
  onSavePaciente,
  onUpdatePaciente,
} from "../store";
import {
  getAllPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
} from "../api/pacientes.api";

import Swal from "sweetalert2";
import { comprobarError, formatearDataPacToBD } from "../pacientes/helpers";

//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const {
    pacientesList,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorRegMessage,
  } = useSelector((state) => state.pacientes);
  // const { dataActiva } = useSelector((state) => state.dataGlobal);

  const changeModalFormReg = (flag) => {
    dispatch(changeFormPacOpen(flag));
    // if (flag) {
    //   console.log("pilas con el " + flag);
    //   dispatch(changeRegisterError(false));
    // }
  };

  // const openModalFormReg = () => {
  //   dispatch(changeFormPacOpen(true));
  // };
  const changeTitleFormReg = (title) => {
    dispatch(changeTitleForm(title));
  };

  const changeDataPaciente = (dataPac) => {
    dispatch(onLoadPacActivo(dataPac));
  };

  const startLoadPacientes = async () => {
    try {
      // const response = await getAllPaciente();
      // const { data } = response;
      const { data } = await getAllPaciente();
      dispatch(onLoadPacientesList(data));
    } catch (error) {
      console.log("Error cargando lista de pacientes");
      console.log(error);
    }
    // setTasks(response.data);
  };

  const startSavingPaciente = async (dataPaciente) => {
    console.log(dataPaciente);

    dispatch(clearErrorMessage());

    try {
      if (dataPaciente.id) {
        //actualizando
        const { data } = await updatePaciente(
          dataPaciente.id,
          formatearDataPacToBD(dataPaciente)
        );

        dispatch(onUpdatePaciente(data));
      } else {
        //registrando
        const { data } = await createPaciente(
          formatearDataPacToBD(dataPaciente)
        );
        dispatch(onSavePaciente(data));
      }

      dispatch(changeRegisterError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterError({
          msg: "Hay errores",
          error: comprobarError(error.response.data.message),
        })
      );
    }
  };

  const startDeletingPaciente = async () => {
    try {
      console.log(pacienteActivo.id);
      await deletePaciente(pacienteActivo.id);
      dispatch(onDeletePaciente());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    pacientesList,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorRegMessage,

    //* Métodos
    changeModalFormReg,
    changeTitleFormReg,
    changeDataPaciente,
    startLoadPacientes,
    startSavingPaciente,
    startDeletingPaciente,
  };
};

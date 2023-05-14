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
  getPacienteById,
} from "../api/pacientes.api";

import Swal from "sweetalert2";
import {
  comprobarError,
  formatearDataPacToBD,
  formatearDataPacToTable,
} from "../pacientes/helpers";

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
  };

  const changeTitleFormReg = (title) => {
    dispatch(changeTitleForm(title));
  };

  const changeDataPaciente = (dataPac) => {
    dispatch(onLoadPacActivo(dataPac));
  };

  const startLoadPacientes = async () => {
    try {
      const { data } = await getAllPaciente();
      dispatch(onLoadPacientesList(formatearDataPacToTable(data)));
    } catch (error) {
      console.log("Error cargando lista de pacientes");
      console.log(error);
    }
  };

  const startLoadPaciente = async (id) => {
    try {
      const { data } = await getPacienteById(id);

      dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
    } catch (error) {
      console.log("Error cargando datos del paciente por ID");
      console.log(error);
    }
  };

  const startSavingPaciente = async (dataPaciente) => {
    dispatch(clearErrorMessage());

    try {
      if (dataPaciente.id) {
        //actualizando
        const { data } = await updatePaciente(
          dataPaciente.id,
          formatearDataPacToBD(dataPaciente)
        );

        dispatch(onUpdatePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
      } else {
        //registrando
        const { data } = await createPaciente(
          formatearDataPacToBD(dataPaciente)
        );

        console.log(data);
        dispatch(onSavePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
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

  const startDeletingPaciente = async (id_paciente = []) => {
    try {
      if (id_paciente.length === 0) {
        await deletePaciente(pacienteActivo.id);
      } else {
        for (const i of id_paciente) {
          await deletePaciente(i);
        }
      }
      dispatch(onDeletePaciente(id_paciente));
      // console.log(pacienteActivo.id);
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
    startLoadPaciente,
    startSavingPaciente,
    startDeletingPaciente,
  };
};

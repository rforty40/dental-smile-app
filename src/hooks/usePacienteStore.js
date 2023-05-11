import { useDispatch, useSelector } from "react-redux";
import {
  changeFormPacOpen,
  changeRegisterError,
  changeTitleForm,
  onLoadPacActivo,
  onLoadPacientesList,
  onSavePaciente,
} from "../store";
import { getAllPaciente, createPaciente } from "../api/pacientes.api";
import { formatearDataPacToBD } from "../helpers";

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
    registerError,
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

  const loadPacientes = async () => {
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

  const savePaciente = async (dataPaciente) => {
    try {
      const { data } = await createPaciente(formatearDataPacToBD(dataPaciente));
      dispatch(onSavePaciente(data));
      dispatch(changeRegisterError(false));
      //
    } catch (error) {
      console.log("Error registrando paciente", error);
    }
  };
  return {
    //* Propiedades
    pacientesList,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    registerError,

    //* Métodos
    changeModalFormReg,
    changeTitleFormReg,
    changeDataPaciente,
    loadPacientes,
    savePaciente,
    // openModalFormReg,
  };
};

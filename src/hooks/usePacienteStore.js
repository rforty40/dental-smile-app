import { useDispatch, useSelector } from "react-redux";
import { changeFormPacOpen, changeTitleForm, onLoadPacActivo } from "../store";

//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const { isFormPacOpen, titleForm, pacienteActivo } = useSelector(
    (state) => state.pacientes
  );
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
  // const changeDataPaciente = () => {
  //   dispatch(onLoadPacActivo(dataActiva));
  // };
  //
  return {
    //* Propiedades
    isFormPacOpen,
    titleForm,
    pacienteActivo,

    //* Métodos
    changeModalFormReg,
    changeTitleFormReg,
    changeDataPaciente,
  };
};

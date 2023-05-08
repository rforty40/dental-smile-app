import { useDispatch, useSelector } from "react-redux";
import { changeFormPacOpen, changeTitleForm } from "../store";

//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const { isFormPacOpen, titleForm, pacienteActivo } = useSelector(
    (state) => state.pacientes
  );

  // const openModalFormReg = () => {
  //   dispatch(openFormPac());
  // };

  // const closeModalFormReg = () => {
  //   dispatch(closeFormPac());
  // };

  const changeModalFormReg = (flag) => {
    dispatch(changeFormPacOpen(flag));
  };
  const changeTitleFormReg = (title) => {
    dispatch(changeTitleForm(title));
  };

  //
  return {
    //* Propiedades
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    //* Métodos
    // openModalFormReg,
    // closeModalFormReg,
    changeModalFormReg,
    changeTitleFormReg,
    // changeHover,
  };
};

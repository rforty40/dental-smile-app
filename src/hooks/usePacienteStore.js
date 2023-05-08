import { useDispatch, useSelector } from "react-redux";
import { closeFormPac, openFormPac } from "../store";

//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const { isFormPacOpen } = useSelector((state) => state.pacientes);

  const openModalFormReg = () => {
    // console.log("se abre el modal");
    dispatch(openFormPac());
  };

  const closeModalFormReg = () => {
    dispatch(closeFormPac());
  };

  //
  return {
    //* Propiedades
    isFormPacOpen,

    //* Métodos
    openModalFormReg,
    closeModalFormReg,
    // changeHover,
  };
};

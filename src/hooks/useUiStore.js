import { useDispatch, useSelector } from "react-redux";
import { onChangeSidebar } from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen } = useSelector((state) => state.ui);

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  //
  return {
    //* Propiedades
    isSidebarOpen,
    //* Métodos
    changeSidebar,
  };
};

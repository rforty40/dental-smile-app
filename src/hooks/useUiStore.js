import { useDispatch, useSelector } from "react-redux";
import { onChangePage, onChangeSidebar } from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen, pageActive } = useSelector((state) => state.ui);

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  const changePage = (page) => {
    dispatch(onChangePage(page));
  };

  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,

    //* Métodos
    changeSidebar,
    changePage,
  };
};

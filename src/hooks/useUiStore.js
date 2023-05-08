import { useDispatch, useSelector } from "react-redux";
import { onChangePage, onChangeSidebar, onChangeConfirmDelete } from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen, pageActive, isConfirmDeleteOpen } = useSelector(
    (state) => state.ui
  );

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  const changePage = () => {
    const { pathname } = window.location;
    let pathnameCut = pathname.substring(1, pathname.length);
    pathnameCut = pathnameCut.charAt(0).toUpperCase() + pathnameCut.slice(1);
    if (pathnameCut === "Administracion") {
      pathnameCut = "Administración";
    }
    dispatch(onChangePage(pathnameCut));
  };

  const changeModalConfDel = (flag) => {
    dispatch(onChangeConfirmDelete(flag));
  };
  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,
    isConfirmDeleteOpen,

    //* Métodos
    changeSidebar,
    changePage,
    changeModalConfDel,
  };
};

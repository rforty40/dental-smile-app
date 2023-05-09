import { useDispatch, useSelector } from "react-redux";
import {
  onChangePage,
  onChangeSidebar,
  onChangeConfirmDelete,
  onLoadDataActiva,
} from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen, pageActive, isConfirmDeleteOpen, dataActiva } =
    useSelector((state) => state.ui);

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
  const changeDataActiva = (dataRow) => {
    dispatch(onLoadDataActiva(dataRow));
  };
  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,
    isConfirmDeleteOpen,
    dataActiva,

    //* Métodos
    changeSidebar,
    changePage,
    changeModalConfDel,
    changeDataActiva,
  };
};

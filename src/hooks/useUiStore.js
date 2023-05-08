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

  const changePage = () => {
    const { pathname } = window.location;
    let pathnameCut = pathname.substring(1, pathname.length);
    pathnameCut = pathnameCut.charAt(0).toUpperCase() + pathnameCut.slice(1);
    if (pathnameCut === "Administracion") {
      pathnameCut = "Administración";
    }
    dispatch(onChangePage(pathnameCut));
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

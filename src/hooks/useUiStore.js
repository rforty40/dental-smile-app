import { useDispatch, useSelector } from "react-redux";
import { onChangeHover, onChangePage, onChangeSidebar } from "../store";

//
//

export const useUiStore = () => {
  //

  const dispatch = useDispatch();

  const { isSidebarOpen, pageActive, isHovereable } = useSelector(
    (state) => state.ui
  );

  const changeSidebar = (flag) => {
    dispatch(onChangeSidebar(flag));
  };

  const changePage = (page) => {
    dispatch(onChangePage(page));
  };

  const changeHover = (hover) => {
    dispatch(onChangeHover(hover));
  };

  //
  return {
    //* Propiedades
    isSidebarOpen,
    pageActive,
    isHovereable,

    //* Métodos
    changeSidebar,
    changePage,
    changeHover,
  };
};

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./";
import { Sidebar } from "../ui";
import { useUiStore } from "../hooks";

export const AppTheme = ({ children }) => {
  const { isSidebarOpen, changePage } = useUiStore();

  //actualizar la pagina activa
  const { pathname } = window.location;

  let pathnameCut = pathname.substring(1, pathname.length);

  pathnameCut = pathnameCut.charAt(0).toUpperCase() + pathnameCut.slice(1);

  if (pathnameCut === "Administracion") {
    pathnameCut = "Administración";
  }

  changePage(pathnameCut);

  //
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main
          className={`content ${
            isSidebarOpen
              ? "content-sidebar-not-extended"
              : "content-sidebar-extended"
          }`}
        >
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

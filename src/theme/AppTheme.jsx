import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { purpleTheme } from "./";
import { Sidebar } from "../ui";
import { useSelector } from "react-redux";

export const AppTheme = ({ children }) => {
  const { isSidebarOpen } = useSelector((state) => state.ui);

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

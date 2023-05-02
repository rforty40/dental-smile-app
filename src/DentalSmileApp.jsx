import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./store";
import { Sidebar, Topbar } from "./ui";

function DentalSmileApp() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppTheme>
            <Topbar />
            <AppRouter />
          </AppTheme>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default DentalSmileApp;

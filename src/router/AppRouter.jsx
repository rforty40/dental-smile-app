import { Navigate, Route, Routes } from "react-router-dom";
import { AgendaRoutes } from "../agenda";
import { DashboardRoutes } from "../dashboard";
import { PacientesRoutes } from "../pacientes";
// import { AuthRoutes } from "../auth/routes/AuthRoutes";
// import { JournalRoutes } from "../journal/routes/JournalRoutes";

// import { CheckingAuth } from "../ui/components/CheckingAuth";

// import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  //
  // const status = useCheckAuth();

  // if (status === "checking") {
  //   return <CheckingAuth />;
  // }

  return (
    <Routes>
      {/* ruta de inicio por defecto */}
      <Route path="/*" element={<Navigate to="/agenda" />} />
      {/* {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} /> */}

      {/* Login y Registro */}
      {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

      {/* DentalSmileApp */}
      <Route path="/agenda" element={<AgendaRoutes />} />
      <Route path="/administracion" element={<DashboardRoutes />} />
      <Route path="/pacientes" element={<PacientesRoutes />} />
    </Routes>
  );
};

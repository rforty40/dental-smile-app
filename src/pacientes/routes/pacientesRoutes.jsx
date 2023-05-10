import { Navigate, Route, Routes } from "react-router-dom";
import { PacienteHistorial, PacientesPage } from "../pages";

export const PacientesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PacientesPage />} />
      <Route path="/:id/historial" element={<PacienteHistorial />} />
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

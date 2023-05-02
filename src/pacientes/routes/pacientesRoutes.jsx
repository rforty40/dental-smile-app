import { Navigate, Route, Routes } from "react-router-dom";
import { PacientesPage } from "../pages/pacientesPage";

export const PacientesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PacientesPage />} />

      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

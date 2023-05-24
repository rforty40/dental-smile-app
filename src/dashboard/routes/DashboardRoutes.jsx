import { Navigate, Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  ListaGastos,
  ListaIngresos,
  ListaProcedOdon,
  ListaTiposConsOdon,
  ListaTiposPagos,
  ListaTiposTratam,
} from "../pages";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/listaprocedimientosodon" element={<ListaProcedOdon />} />
      <Route path="/listatiposconsodon" element={<ListaTiposConsOdon />} />
      <Route path="/listatipostratam" element={<ListaTiposTratam />} />
      <Route path="/listatipospagos" element={<ListaTiposPagos />} />
      <Route path="/listaingresos" element={<ListaIngresos />} />
      <Route path="/listagastos" element={<ListaGastos />} />
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

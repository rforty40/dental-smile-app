import dentalSmileApi from "./dentalSmileApi";

export const getConsultas = async (id_pac, filtro, param1, param2) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/historial/${filtro}/${param1}/${param2}`
  );

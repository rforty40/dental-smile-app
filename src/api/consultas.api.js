import dentalSmileApi from "./dentalSmileApi";

export const getConsultas = async (id_pac, filtro, param1, param2) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/historial/${filtro}/${param1}/${param2}`
  );

export const createConsulta = async (id_pac, consData) =>
  await dentalSmileApi.post(`/pacientes/${id_pac}/consultas/create`, consData);

export const updateConsulta = async (id_pac, idCons, consData) =>
  await dentalSmileApi.put(
    `/pacientes/${id_pac}/consultas/${idCons}/update`,
    consData
  );

export const deleteConsulta = async (id_pac, idCons) =>
  await dentalSmileApi.delete(
    `/pacientes/${id_pac}/consultas/${idCons}/delete`
  );

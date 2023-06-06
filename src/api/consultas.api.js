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

export const getConsultaById = async (id_pac, id_cons) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/consultas/${id_cons}/detalle/detalle`
  );

//Signos vitales

export const getSignosVitales = async (id_pac, id_cons) =>
  await dentalSmileApi.get(
    `/pacientes/${id_pac}/consultas/${id_cons}/detalle/signosVitales`
  );

export const createSignosVitales = async (id_cons, signVit) =>
  await dentalSmileApi.post(
    `/consulta/${id_cons}/signos_vitales/create`,
    signVit
  );

export const updateSignosVitales = async (id_cons, id_sign, signVit) =>
  await dentalSmileApi.put(
    `/consulta/${id_cons}/signos_vitales/update/${id_sign}`,
    signVit
  );

//

// Examenes estomatognaticos
export const getExamenes = async (id_cons) =>
  await dentalSmileApi.get(`/consulta/${id_cons}/examenes`);

export const createExamen = async (id_cons, examen) =>
  await dentalSmileApi.post(`/consulta/${id_cons}/examen_esto/create`, examen);

export const updateExamen = async (id_exa, examen) =>
  await dentalSmileApi.put(`/examen_esto/update/${id_exa}`, examen);

export const deleteExamen = async (id_exa) =>
  await dentalSmileApi.delete(`/examen_esto/delete/${id_exa}`);

//

//Enfermedades CIE
export const getEnfermedadesCIE = async () =>
  await dentalSmileApi.get(`/enfermedades/_`);

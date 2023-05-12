import dentalSmileApi from "./dentalSmileApi";

export const getAllPaciente = async () =>
  await dentalSmileApi.get("/pacientes/_");

export const createPaciente = async (paciente) =>
  await dentalSmileApi.post("/createPaciente", paciente);

export const updatePaciente = async (id_pac, paciente) =>
  await dentalSmileApi.put(`/updatePaciente/${id_pac}`, paciente);

export const deletePaciente = async (id_pac) =>
  await dentalSmileApi.delete(`/deletePaciente/${id_pac}`);
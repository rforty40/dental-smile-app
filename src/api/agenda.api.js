import dentalSmileApi from "./dentalSmileApi";

export const getAllCites = async () =>
  await dentalSmileApi.get("/citas/all/_/_");

export const createCita = async (cita) =>
  await dentalSmileApi.post("/createCita", cita);

export const updateCita = async (fecha, horaIni, cita) =>
  await dentalSmileApi.put(`/updateCita/${fecha}/${horaIni}`, cita);

// export const updatePaciente = async (id_pac, paciente) =>
//   await dentalSmileApi.put(`/updatePaciente/${id_pac}`, paciente);

// export const deletePaciente = async (id_pac) =>
//   await dentalSmileApi.delete(`/deletePaciente/${id_pac}`);

// export const getPacienteById = async (id_pac) =>
//   await dentalSmileApi.get(`/paciente/${id_pac}`);

import dentalSmileApi from "./dentalSmileApi";

export const getAllPaciente = async () =>
  await dentalSmileApi.get("/pacientes/_");

export const createPaciente = async (paciente) =>
  await dentalSmileApi.post("/createPaciente", paciente);

export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/tasks/${id}`, newFields);

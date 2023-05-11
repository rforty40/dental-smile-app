export const formatearDataPacToBD = (data) => {
  return {
    priNom_paciente: data.erNombre,
    segNom_paciente: data.doNombre === "" ? null : data.doNombre,
    priApe_paciente: data.erApellido,
    segApe_paciente: data.doApellido === "" ? null : data.doApellido,
    ced_paciente: data.cedula,
    eda_paciente: parseInt(data.edad),
    sex_paciente: data.sexo,
    tel_paciente: data.telefono === "" ? null : data.telefono,
    ema_paciente: data.email === "" ? null : data.email,
    nomRes_paciente: data.nomRes === "" ? null : data.nomRes,
    parRes_paciente: data.parRes === "" ? null : data.parRes,
    telRes_paciente: data.telRes === "" ? null : data.telRes,
  };
};

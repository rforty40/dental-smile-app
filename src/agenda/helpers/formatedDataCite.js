// console.log(pacientesList);

// if (pacientesList[0]) {
//   const pruebaFecha = pacientesList[0].create_paciente;
//   console.log("pruebaFecha", pruebaFecha);

//   let date = Date.parse(pruebaFecha);
//   console.log(date);

//   console.log(typeof date);
//   let jsDate = new Date(date);

//   console.log(jsDate);
// }

export const formatedDataCite = (citas) => {
  return citas.map((cita) => {
    return {
      start: new Date(
        Date.parse(cita.fecha_cita + " " + cita.hora_inicio + ":00")
      ),
      end: new Date(Date.parse(cita.fecha_cita + " " + cita.hora_fin + ":00")),
      ...cita,
    };
  });
};

export const retornarFecha = (state, newValue) => {
  return new Date(
    Date.parse(
      newValue
        .toLocaleString("sv-SE", { hour12: false })
        .split(" ")[0]
        .replaceAll("-", "/") +
        " " +
        state.toLocaleString("sv-SE", { hour12: false }).split(" ")[1]
    )
  );
};

export const formatearDataCiteToBD = (dataCita) => {
  return {
    fecha_citaAgen: dataCita.stateDatePicker
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[0]
      .replaceAll("-", "/"),

    horaIni_citaAgen: dataCita.stateTimeIni
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[1]
      .substring(0, 5),
    horaFin_citaAgen: dataCita.stateTimeFin
      .toLocaleString("sv-SE", { hour12: false })
      .split(" ")[1]
      .substring(0, 5),
    id_paciente: dataCita.statePacList,
    moti_citaAgen: dataCita.stateMotivo,
    esta_citaAgen: "Pendiente",
  };
};

export const comprobarErrorCite = (typeError) => {
  let msgError = "";

  if (
    typeError.includes("Duplicate entry") &&
    typeError.includes("citaagendada_tbl.PRIMARY")
  ) {
    msgError = "Ya existe una cita registrada en la misma hora de inicio.";
  } else if (typeError.includes("Data too long for column")) {
    msgError = "Se excedió el límite en el campo motivo de consulta";
  } else {
    msgError =
      "Error: " +
      typeError +
      ". Para mas información contactese con el administrador";
  }

  return msgError;
};

export const extraerFecha = (fecha) => {
  const fechaConvertida =
    fecha.getFullYear() +
    "/" +
    String(fecha.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(fecha.getDate()).padStart(2, "0");

  return fechaConvertida;
};

export const arrMes = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
  " ", //12
];

export const extractMesAnio = (fecha) => {
  return (
    [arrMes[new Date(fecha.fecha_cita).getMonth()]] +
    "_" +
    new Date(fecha.fecha_cita).getFullYear()
  );
};

export const addZeroStr = (mes) => {
  const mesString = mes.toString();
  return mesString.length < 2 ? "0" + mesString : mesString;
};

/* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
export const sumarDias = (fecha, dias) => {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};
// argumento 2023-05-24 salida 2023-05-25
export const addDayDateEnd = (fechaFin) => {
  const NewFechaFin = sumarDias(new Date(fechaFin.replaceAll("-", "/")), 1);

  return extraerFecha(NewFechaFin).replaceAll("/", "-");
};

export const DiaActualFormated = (today) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // options.timeZone = "UTC";
  // options.timeZoneName = "short";

  return today.toLocaleString("es-ES", options);

  /*
    Resultado: Monday, January 27, 2020, UTC
*/
};

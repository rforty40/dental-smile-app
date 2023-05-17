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

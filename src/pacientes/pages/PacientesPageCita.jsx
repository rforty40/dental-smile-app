import { Box, Typography } from "@mui/material";
import { CustomTable } from "../../ui";
import { dataCitas } from "./dataCitas";

const TABLE_HEAD = [
  { id: "cuando", label: "¿Cuando?", alignRight: false },
  { id: "hora", label: "Hora", alignRight: false },
  { id: "fecha", label: "Fecha", alignRight: false },

  { id: "paciente", label: "Paciente", alignRight: false },

  { id: "telefono", label: "Teléfono", alignRight: false },
  { id: "motivo", label: "Motivo", alignRight: false },
  // { id: "estado", label: "Estado", alignRight: false },
];

export const PacientesPageCita = () => {
  const dataPacFormated = dataCitas.map((data) => {
    return {
      id: data.fecha_cita + "-" + data.hora_inicio,

      cuando: data.Cuando,
      hora: data.hora_inicio,
      fecha: data.fecha_cita,
      paciente: data.Paciente,
      telefono: data.Telefono,
      motivo: data.moti_citaAgen,
      // estado: data.esta_citaAgen,
    };
  });

  return (
    <Box m="20px" display="flex" justifyContent="end" className="box-shadow">
      <Typography variant="h5">Pacientes</Typography>

      <CustomTable
        TABLE_HEAD={TABLE_HEAD}
        DATALIST={dataPacFormated}
        columnaABuscarPri="cuando"
        searchWhat={"Buscar citas..."}
        // bgHeader={}
        txt_header={"Citas Pendientes"}
        withToolbar={true}
        withButton={true}
        withBoxSearch={false}
        typeButton={"PostAdd"}
      />
    </Box>
  );
};

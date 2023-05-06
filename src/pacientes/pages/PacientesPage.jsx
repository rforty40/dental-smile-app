import { Box, Grid, Typography } from "@mui/material";
import { CustomTable } from "../../ui";
import { dataPacientes } from "./dataPacientes";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  // { id: "apellidos", label: "Apellidos", alignLeft: false },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "correo", label: "Correo", alignLeft: false },
  { id: "responsable", label: "Responsable", alignLeft: false },
];
const formatearNombre = (pri, seg) => {
  let nombres = pri;
  if (seg !== null) {
    nombres += " " + seg;
  }
  return nombres;
};

const formatearRes = (nom, parent, telres) => {
  let responsable = "";

  if (nom !== null) {
    responsable += nom;
  }
  if (parent !== null) {
    responsable += " - " + parent;
  }
  if (telres !== null) {
    responsable += " - " + telres;
  }

  return responsable;
};

export const PacientesPage = () => {
  const dataPacFormated = dataPacientes.map((data) => {
    return {
      id: data.id_paciente,
      nombre:
        `${formatearNombre(data.priNom_paciente, data.segNom_paciente)}` +
        ` ${formatearNombre(data.priApe_paciente, data.segApe_paciente)}`,

      cedula: data.ced_paciente,
      edad: data.eda_paciente,
      sexo: data.sex_paciente,
      telefono: data.tel_paciente,
      correo: data.ema_paciente,
      responsable: formatearRes(
        data.nomRes_paciente,
        data.parRes_paciente,
        data.telRes_paciente
      ),
    };
  });

  return (
    // <Box m="20px" display="flex" justifyContent="end" className="box-shadow">
    <Box
      // margin="20px"
      margin="0 20px 0 20px"
      display="flex"
      justifyContent="end"
      className="box-shadow animate__animated animate__fadeIn"

      // padding="20px"
      // backgroundColor="white"
      // borderRadius="10px"
    >
      <CustomTable
        TABLE_HEAD={TABLE_HEAD}
        DATALIST={dataPacFormated}
        columnaABuscarPri="nombre"
        searchWhat={"Buscar pacientes ..."}
        txt_header={"Lista de pacientes"}
        withToolbar={true}
        withBoxSearch={true}
        withButton={true}
        typeButton={"PersonAddAlt"}
      />
    </Box>
  );
};

import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomTable } from "../../ui";
import { dataPacientes } from "./dataPacientes";
import { usePacienteStore, useUiStore } from "../../hooks";
import FormModal from "../components/FormModal";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "correo", label: "Correo", alignLeft: true },
  { id: "responsable", label: "Responsable", alignLeft: true },
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
  const { changePage } = useUiStore();

  useEffect(() => {
    console.log("PacientePage");
    changePage();
  }, []);

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

  //funcion abrir modal formulario

  const { openModalFormReg } = usePacienteStore();
  const openModalPaciente = () => {
    openModalFormReg();
  };
  return (
    <Box
      // margin="20px"
      margin="-10px 20px 0 20px"
      display="flex"
      justifyContent="end"
      className="box-shadow animate__animated animate__fadeIn"
    >
      <CustomTable
        TABLE_HEAD={TABLE_HEAD}
        DATALIST={dataPacFormated}
        columnaABuscarPri="nombre"
        searchWhat={"Buscar pacientes ..."}
        txt_header={"Lista de pacientes"}
        withToolbar={true}
        withBoxSearch={true}
        typeButton={"PersonAddAlt"}
        txt_button={"Registar Paciente"}
        iconosEnFila={false}
        funcionBtnTbl={openModalPaciente}
      />

      <FormModal />
    </Box>
  );
};

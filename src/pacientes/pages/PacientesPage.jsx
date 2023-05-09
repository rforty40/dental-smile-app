import { useEffect } from "react";
import { Box } from "@mui/material";
import { CustomTable, DeleteConfirm } from "../../ui";
import { dataPacientes } from "./dataPacientes";
import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "email", label: "Email", alignLeft: true },
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
      erNombre: data.priNom_paciente,
      doNombre: data.segNom_paciente,
      erApellido: data.priApe_paciente,
      doApellido: data.segApe_paciente,
      nomRes: data.nomRes_paciente,
      parRes: data.parRes_paciente,
      telRes: data.telRes_paciente,
      //

      nombre:
        `${formatearNombre(data.priNom_paciente, data.segNom_paciente)}` +
        ` ${formatearNombre(data.priApe_paciente, data.segApe_paciente)}`,

      cedula: data.ced_paciente,
      edad: data.eda_paciente,
      sexo: data.sex_paciente,
      telefono: data.tel_paciente,
      email: data.ema_paciente,
      responsable: formatearRes(
        data.nomRes_paciente,
        data.parRes_paciente,
        data.telRes_paciente
      ),
    };
  });

  //funcion abrir modal formulario

  const { changeModalFormReg, pacienteActivo } = usePacienteStore();

  const openModalPaciente = () => {
    changeModalFormReg(true);
  };

  //
  return (
    <Box
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
        typeDatos={"pacientes"}
        txt_button={"Registrar Paciente"}
        iconosEnFila={false}
        funcionBtnTbl={openModalPaciente}
        dataOmitida={8}
      />

      <FormModalPac />
      <DeleteConfirm
        message={
          <>
            ¿Está segura que desea eliminar el registro de
            <span style={{ color: "#9c27b0" }}>
              {" "}
              {pacienteActivo.nombre} - {pacienteActivo.cedula}
            </span>
            ?
          </>
        }
      />
    </Box>
  );
};

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { CustomAlert, CustomTable, DeleteConfirm, Topbar } from "../../ui";

import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";
import { formatearDataPacToTable } from "../helpers";
import { CheckCircleOutline, DeleteForever } from "@mui/icons-material";
import { format } from "date-fns";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "email", label: "Email", alignLeft: true },
  { id: "responsable", label: "Responsable", alignLeft: true },
  { id: "fecha_reg", label: "Fecha", alignLeft: true },
];

export const PacientesPage = () => {
  const { changePage } = useUiStore();
  const {
    pacientesList,
    pacienteActivo,
    changeModalFormReg,
    startLoadPacientes,
    startDeletingPaciente,
  } = usePacienteStore();

  useEffect(() => {
    console.log("PacientePage");
    changePage();
  }, []);

  useEffect(() => {
    startLoadPacientes();
  }, []);

  console.log(pacientesList);

  if (pacientesList[0]) {
    const pruebaFecha = pacientesList[0].create_paciente;
    console.log("pruebaFecha", pruebaFecha);

    let date = Date.parse(pruebaFecha);
    console.log(date);

    console.log(typeof date);
    let jsDate = new Date(date);

    console.log(jsDate);
  }

  const dataPacFormated = formatearDataPacToTable(pacientesList);

  //funcion abrir modal formulario
  const openModalPaciente = () => {
    changeModalFormReg(true);
  };

  //controlDialog
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //

  //funcion eliminar registro pacient
  const deleteRegisterPaciente = (/*event*/) => {
    startDeletingPaciente();
    handleOpenSnackbar();
  };

  return (
    <>
      <Topbar />
      <Box
        margin="-10px 20px 0 20px"
        display="flex"
        justifyContent="end"
        className="box-shadow animate__animated animate__fadeIn"
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={dataPacFormated}
          columnaABuscarPri="fecha_reg"
          searchWhat={"Buscar pacientes ..."}
          txt_header={"Lista de pacientes"}
          withToolbar={true}
          withBoxSearch={true}
          typeDatos={"pacientes"}
          txt_button={"Registrar Paciente"}
          iconosEnFila={false}
          funcionBtnTbl={openModalPaciente}
          dataOmitida={8}
          funcionBtnTblDelete={handleOpenDialogDel}
        />

        <FormModalPac />

        <DeleteConfirm
          stateOpen={openDialogDelete}
          setStateOpen={setOpenDialogDelete}
          message={
            <>
              ¿Está segura que desea eliminar el registro de
              <span style={{ color: "#9c27b0" }}>
                {" "}
                {pacienteActivo !== null &&
                  `${pacienteActivo.nombre} - ${pacienteActivo.cedula}`}
              </span>
              ?
            </>
          }
          funcionDelete={deleteRegisterPaciente}
        />

        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={"El registro fue eliminado exitosamente"}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Box>
    </>
  );
};

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
  Topbar,
} from "../../ui";

import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";
import { formatearDataPacToTable } from "../helpers";
import {
  CheckCircleOutline,
  DeleteForever,
  PersonAddAlt,
} from "@mui/icons-material";
import { format } from "date-fns";

const TABLE_HEAD = [
  { id: "nombre", label: "Nombre", alignLeft: true },
  { id: "cedula", label: "Cédula", alignLeft: true },
  { id: "edad", label: "Edad", alignLeft: true },
  { id: "sexo", label: "Sexo", alignLeft: true },
  { id: "telefono", label: "Teléfono", alignLeft: true },
  { id: "email", label: "Email", alignLeft: true },
  { id: "responsable", label: "Responsable", alignLeft: true },
  { id: "fecha", label: "Fecha", alignLeft: true },
];

export const PacientesPage = () => {
  const { changePage } = useUiStore();
  const {
    pacientesList,
    pacienteActivo,
    changeModalFormReg,
    startLoadPacientes,
    startDeletingPaciente,
    changeTitleFormReg,
  } = usePacienteStore();

  useEffect(() => {
    console.log("PacientePage");
    changePage();
  }, []);

  useEffect(() => {
    startLoadPacientes();
  }, []);

  // const dataPacFormated = formatearDataPacToTable(pacientesList);

  //funcion abrir modal registrar
  const openModalPaciente = () => {
    changeTitleFormReg("Registro de paciente");
    changeModalFormReg(true);
  };
  //funcion abrir modal editar
  const openModalPacienteEdit = () => {
    changeTitleFormReg("Editar datos del paciente");
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

  const [msgAlertDel, setMsgAlertDel] = useState("");
  //funcion eliminar registro paciente y eliminar varios registros
  const deleteRegisterPaciente = (selected = []) => {
    startDeletingPaciente(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El registro del paciente fue eliminado.");
    } else {
      setMsgAlertDel("Los registros fueron eliminados exitosamente.");
    }
    handleOpenSnackbar();
  };

  const BtnToolbarTable = ({ bgHeaderColor }) => {
    return (
      <ButtonCustom
        altura={"40px"}
        colorf={bgHeaderColor === "primary.main" ? "white" : "primary.main"}
        colorh={
          bgHeaderColor === "primary.main"
            ? "btnHoverInForm.main"
            : "secondary.main"
        }
        colort={bgHeaderColor === "primary.main" ? "black" : "white"}
        txt_b={"Registrar Paciente"}
        colorth="white"
        fontW="bold"
        iconB={<PersonAddAlt />}
        onClick={openModalPaciente}
      />
    );
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
          DATALIST={pacientesList}
          withToolbar
          withBoxSearch
          withButton
          iconosEnFila={false}
          btnToolbarTable={BtnToolbarTable}
          columnaABuscarPri="fecha"
          searchWhat={"Buscar pacientes ..."}
          txt_header={"Lista de pacientes"}
          // bgHeaderColor={""}
          dataOmitida={9}
          openModalEdit={openModalPacienteEdit}
          funcionBtnTblDelete={handleOpenDialogDel}
          funcionDeleteVarious={deleteRegisterPaciente}
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
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Box>
    </>
  );
};

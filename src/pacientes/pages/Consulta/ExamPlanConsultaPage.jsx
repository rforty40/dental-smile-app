import React from "react";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../../ui";
import { DeleteForever, NoteAdd, PersonAddAlt } from "@mui/icons-material";
import { Box, Portal, Typography } from "@mui/material";
import {
  useConsultasStore,
  useDataStore,
  useExamenesStore,
} from "../../../hooks";
import { useEffect } from "react";
import { useState } from "react";
import { FormModalExam } from "../../components/FormModalExam";

const TABLE_HEAD_EXAM = [
  { id: "region_afectada", label: "Región afectada", alignLeft: true },
  { id: "enfermedad", label: "Enfermedad", alignLeft: true },
  { id: "descripcion", label: "Descripción", alignLeft: true },
];
export const ExamPlanConsultaPage = () => {
  //

  //store
  const { dataActiva } = useDataStore();
  const { consultaActiva } = useConsultasStore();
  const {
    examenesList,
    startLoadExamenes,
    changeDataExamen,
    startDeletingExam,
  } = useExamenesStore();

  //hook abrir el formulario
  const [stateModalFormExam, setStateModalFormExam] = useState(false);

  //hook cambiar titulo del formulario
  const [titleFormExa, setTitleFormExa] = useState("");

  //hook controlDialog Eliminar
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  //hook abrir Alert de Eliminación
  const [stateSnackbar, setStateSnackbar] = useState(false);

  //hook mensaje de alerta despues de la eliminacion de un registro
  const [msgAlertDel, setMsgAlertDel] = useState("");

  //efectos secundarios
  useEffect(() => {
    startLoadExamenes();
  }, [consultaActiva]);

  useEffect(() => {
    changeDataExamen(dataActiva);
  }, [dataActiva]);

  //abrir el modal para crear un examen
  const openModalFormExam = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Registrar examen estomatognático");
    changeDataExamen(null);
  };

  //abrir el modal para editar examen
  const openModalExamEdit = () => {
    setStateModalFormExam(true);
    setTitleFormExa("Editar examen estomatognático");
  };

  //abrir confirm dialog eliminar
  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };

  //control alert
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //eliminar Examenes
  const deleteExamenes = (selected = []) => {
    startDeletingExam(selected);
    if (selected.length <= 1) {
      setMsgAlertDel("El examen estomatognático fue eliminado.");
    } else {
      setMsgAlertDel(
        "Los examenes estomatognáticos fueron eliminados exitosamente."
      );
    }
    handleOpenSnackbar();
  };

  //boton de la tabla
  const BtnToolbarTable = ({ bgHeaderColor }) => {
    return (
      <ButtonCustom
        altura="35px"
        txt_b_size="14px"
        flexDir="column-reverse"
        colorf="transparent"
        colorh="transparent"
        colort="white"
        colorth="celesteNeon.main"
        txt_b="Agregar"
        fontW="bold"
        iconB={<NoteAdd />}
        propsXS={{ boxShadow: "none !important" }}
        onClick={openModalFormExam}
      />
    );
  };

  return (
    <Box
      component="div"
      className="animate__animated animate__fadeInUp animate__faster"
      sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
    >
      <CustomTable
        TABLE_HEAD={TABLE_HEAD_EXAM}
        DATALIST={examenesList}
        withToolbar
        withBoxSearch={false}
        withButton
        iconosEnFila={false}
        btnToolbarTable={BtnToolbarTable}
        columnaABuscarPri="region_afectada"
        searchWhat={"Buscar examén ..."}
        txt_header={"Examen del sistema estomatognático"}
        bgColorPagination="white"
        bgColorTable="rgba(255,255,255,0.5)"
        dataOmitida={3}
        openModalEdit={openModalExamEdit}
        funcionBtnTblDelete={handleOpenDialogDel}
        funcionDeleteVarious={deleteExamenes}
      />

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "55px",
            backgroundColor: "primary.main",
          }}
        >
          <Typography
            className="text-shadow"
            variant="h6"
            sx={{
              color: "white",
              paddingLeft: "20px",
            }}
          >
            Planes de diagnóstico, terapéutico y educacional
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
              backgroundColor: "myBgColor.main",
              color: "primary.main",
              padding: "10px 20px",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">Planes de Diagnóstico</Typography>
            <ButtonCustom
              altura="40px"
              // txt_b_size="14px"
              flexDir="column-reverse"
              colorf="transparent"
              colorh="transparent"
              colort="primary.main"
              colorth="blueSecondary.main"
              // txt_b="Agregar"

              iconB={<NoteAdd />}
              propsXS={{ boxShadow: "none !important" }}
              // onClick={openModalPaciente}
            />
          </Box>
          <CustomTable
            TABLE_HEAD={TABLE_HEAD_EXAM}
            DATALIST={[]}
            withToolbar={false}
            iconosEnFila={false}
            btnToolbarTable={BtnToolbarTable}
            columnaABuscarPri="region_afectada"
            searchWhat={"Buscar examén ..."}
            txt_header={"Examen del sistema estomatognático"}
            // bgHeaderColor={""}
            bgColorPagination="rgba(255,255,255,0.7)"
            // dataOmitida={9}
            // openModalEdit={openModalPacienteEdit}
            // funcionBtnTblDelete={handleOpenDialogDel}
            // funcionDeleteVarious={deleteRegisterPaciente}
          />
        </Box>
      </Box>
      <FormModalExam
        openModal={stateModalFormExam}
        setOpenModal={setStateModalFormExam}
        title={titleFormExa}
      />
      <DeleteConfirm
        stateOpen={openDialogDelete}
        setStateOpen={setOpenDialogDelete}
        message="¿Está segura que desea eliminar el examen estomatognático?"
        funcionDelete={deleteExamenes}
      />

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlertDel}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<DeleteForever sx={{ color: "white" }} />}
        />
      </Portal>
    </Box>
  );
};

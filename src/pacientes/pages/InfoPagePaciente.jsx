import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import {
  ButtonCustom,
  CustomAlert,
  CustomTable,
  DeleteConfirm,
} from "../../ui";
import {
  BorderColor,
  CancelOutlined,
  DeleteForever,
  Edit,
  EditAttributes,
  PersonAddAlt,
  SaveOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { usePacienteStore } from "../../hooks";
import { FormModalPac, PacInfoItem } from "../components";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MdPostAdd } from "react-icons/md";

export const InfoPagePaciente = () => {
  const { changeModalFormReg, changeTitleFormReg } = usePacienteStore();

  const { pacienteActivo, startDeletingPaciente } = usePacienteStore();

  const navigate = useNavigate();
  useEffect(() => {
    changeTitleFormReg("Editar datos del paciente");
  }, []);

  const openModalPacienteEdit = () => {
    changeModalFormReg(true);
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //controlDialog
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const handleOpenDialogDel = () => {
    setOpenDialogDelete(true);
  };
  const deleteRegisterPaciente = () => {
    startDeletingPaciente();
    navigate("/pacientes");
  };

  const TABLE_HEAD = [
    { id: "tipo", label: "Tipo de antecedente", alignLeft: true },
    { id: "desc", label: "Descripción", alignLeft: true },
  ];

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        rowGap="30px"
      >
        {/**datos personales */}
        <div
          className="animate__animated animate__fadeInRight animate__faster   
        
        "
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              // boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              // padding="0px 5px"
              // sx={{ backgroundColor: "rgba(250,250,250, 0.6)" }}
            >
              <Typography variant="h6">Datos personales</Typography>
              <div style={{ backgroundColor: "rgba(250,250,250, 0.6)" }}>
                <ButtonCustom
                  altura={"60px"}
                  colorf={"transparent"}
                  colorh={"transparent"}
                  colort={"blueSecondary.main"}
                  txt_b={"Editar"}
                  flexDir="column-reverse"
                  colorth={"secondary.main"}
                  txt_b_size="14px"
                  propsXS={{ boxShadow: "none !important" }}
                  onClick={openModalPacienteEdit}
                  iconB={<FaUserEdit />}
                />
                <ButtonCustom
                  altura={"60px"}
                  colorf={"transparent"}
                  colorh={"transparent"}
                  colort={"error.main"}
                  txt_b={"Eliminar"}
                  flexDir="column-reverse"
                  colorth={"secondary.main"}
                  txt_b_size="14px"
                  propsXS={{ boxShadow: "none !important" }}
                  onClick={handleOpenDialogDel}
                  iconB={<TiUserDelete />}
                />
              </div>
            </Box>
            <Paper
              elevation={5}
              sx={{ width: "100%", padding: "20px", margin: "0px 20px" }}
            >
              <Grid
                container
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gridTemplateRows: "repeat(3, max-content)",
                  rowGap: "15px",
                  columnGap: "10px",
                  gridTemplateAreas: `"nombre cedula responsable " 
              "edad email responsable "
              "sexo telefono  fechas "`,
                }}
              >
                <PacInfoItem
                  gridArea={"nombre"}
                  lblItem={"Paciente"}
                  dataPac={pacienteActivo.nombre}
                />

                <PacInfoItem
                  gridArea={"cedula"}
                  lblItem={"Cédula"}
                  dataPac={pacienteActivo.cedula}
                />
                <PacInfoItem
                  gridArea={"responsable"}
                  lblItem={"Responsable"}
                  dataPac={
                    <>
                      <span style={{ display: "block" }}>
                        {pacienteActivo.nomRes}
                      </span>
                      <span style={{ display: "block" }}>
                        {pacienteActivo.parRes}
                      </span>
                      <span style={{ display: "block" }}>
                        {pacienteActivo.telRes}
                      </span>
                    </>
                  }
                />
                <PacInfoItem
                  gridArea={"edad"}
                  lblItem={"Edad"}
                  dataPac={pacienteActivo.edad}
                />
                <PacInfoItem
                  gridArea={"email"}
                  lblItem={"Email"}
                  dataPac={pacienteActivo.email}
                />
                <PacInfoItem
                  gridArea={"sexo"}
                  lblItem={"Sexo"}
                  dataPac={pacienteActivo.sexo}
                />
                <PacInfoItem
                  gridArea={"telefono"}
                  lblItem={"Teléfono"}
                  dataPac={pacienteActivo.telefono}
                />

                <Grid
                  item
                  gridArea="fechas"
                  display="flex"
                  flexDirection="column"
                  alignItems="end"
                >
                  <Typography sx={{ color: "grey" }}>
                    Fecha de registro:
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {" "}
                      {pacienteActivo.fecha}
                    </span>
                  </Typography>
                  <Typography sx={{ color: "grey" }}>
                    Fecha de actualización:
                    <span
                      style={{
                        fontStyle: "italic",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {" "}
                      {pacienteActivo.fecha_upd}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>

        {/* antecedentes personales */}
        <div
          className="animate__animated animate__fadeInLeft animate__faster"
          style={{ width: "1092px" }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 5px"
              sx={{ backgroundColor: "rgba(250,250,250, 0.6)" }}
            >
              <Typography variant="h6">Antecedentes personales</Typography>
              <ButtonCustom
                altura={"60px"}
                colorf={"transparent"}
                colorh={"transparent"}
                colort={"primary.main"}
                txt_b={"Agregar"}
                flexDir="column-reverse"
                colorth={"secondary.main"}
                txt_b_size="14px"
                propsXS={{ boxShadow: "none !important" }}
                onClick={openModalPacienteEdit}
                iconB={<MdPostAdd />}
              />
            </Box>
            <CustomTable
              TABLE_HEAD={TABLE_HEAD}
              DATALIST={[]}
              withToolbar={false}
              iconosEnFila
              bgHeaderColor={"white"}
              // dataOmitida={9}
              // openModalEdit={openModalPacienteEdit}
              // funcionBtnTblDelete={handleOpenDialogDel}
              // funcionDeleteVarious={deleteRegisterPaciente}
            />

            {JSON.stringify(pacienteActivo) !== "{}" &&
            pacienteActivo !== null ? (
              <FormModalPac />
            ) : (
              ""
            )}
          </Box>
        </div>

        <div
          className="animate__animated animate__fadeInLeft animate__faster"
          style={{ width: "1092px" }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 5px"
              sx={{ backgroundColor: "rgba(250,250,250, 0.6)" }}
            >
              <Typography variant="h6">Antecedentes personales</Typography>
              <ButtonCustom
                altura={"60px"}
                colorf={"transparent"}
                colorh={"transparent"}
                colort={"primary.main"}
                txt_b={"Agregar"}
                flexDir="column-reverse"
                colorth={"secondary.main"}
                txt_b_size="14px"
                propsXS={{ boxShadow: "none !important" }}
                onClick={openModalPacienteEdit}
                iconB={<MdPostAdd />}
              />
            </Box>
            <CustomTable
              TABLE_HEAD={TABLE_HEAD}
              DATALIST={[]}
              withToolbar={false}
              iconosEnFila
              bgHeaderColor={"white"}
              // dataOmitida={9}
              // openModalEdit={openModalPacienteEdit}
              // funcionBtnTblDelete={handleOpenDialogDel}
              // funcionDeleteVarious={deleteRegisterPaciente}
            />

            {JSON.stringify(pacienteActivo) !== "{}" &&
            pacienteActivo !== null ? (
              <FormModalPac />
            ) : (
              ""
            )}
          </Box>
        </div>
        <div
          className="animate__animated animate__fadeInLeft animate__faster"
          style={{ width: "1092px" }}
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            rowGap="7px"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
              padding="0px 5px"
              sx={{ backgroundColor: "rgba(250,250,250, 0.6)" }}
            >
              <Typography variant="h6">Antecedentes personales</Typography>
              <ButtonCustom
                altura={"60px"}
                colorf={"transparent"}
                colorh={"transparent"}
                colort={"primary.main"}
                txt_b={"Agregar"}
                flexDir="column-reverse"
                colorth={"secondary.main"}
                txt_b_size="14px"
                propsXS={{ boxShadow: "none !important" }}
                onClick={openModalPacienteEdit}
                iconB={<MdPostAdd />}
              />
            </Box>
            <CustomTable
              TABLE_HEAD={TABLE_HEAD}
              DATALIST={[]}
              withToolbar={false}
              iconosEnFila
              bgHeaderColor={"white"}
              // dataOmitida={9}
              // openModalEdit={openModalPacienteEdit}
              // funcionBtnTblDelete={handleOpenDialogDel}
              // funcionDeleteVarious={deleteRegisterPaciente}
            />

            {JSON.stringify(pacienteActivo) !== "{}" &&
            pacienteActivo !== null ? (
              <FormModalPac />
            ) : (
              ""
            )}
          </Box>
        </div>
      </Box>
      {JSON.stringify(pacienteActivo) !== "{}" && pacienteActivo !== null ? (
        <FormModalPac />
      ) : (
        ""
      )}
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
      {/* <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message="El registro del paciente fue eliminado."
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      /> */}
    </>
  );
};

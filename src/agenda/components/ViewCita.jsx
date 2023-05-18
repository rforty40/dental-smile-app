import { useState } from "react";
import { Box, Grid, Icon, Typography } from "@mui/material";
import { ButtonCustom, IconTextField } from "../../ui";
import {
  AccessTime,
  CancelOutlined,
  DeleteOutlined,
  EditOutlined,
  Event,
  PersonSearch,
  PostAddOutlined,
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import { useAgendaStore } from "../../hooks";
import { AgendaModal } from "./AgendaModal";

export const ViewCita = ({ closeCitaView }) => {
  //
  const { changeStateFormAgenda, changeTitleFormAgenda, activeCita } =
    useAgendaStore();

  const openFormEditCite = () => {
    closeCitaView(true);
    changeStateFormAgenda(true);
    changeTitleFormAgenda("Editar cita odontológica");
  };
  console.log(activeCita);
  return (
    <Box
      boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
      display="flex"
      sx={{
        width: 600,
        // backgroundImage: `linear-gradient(38deg, rgba(245,247,250,1) 0%, rgba(17,100,130,1) 100%)`,
        backgroundColor: "rgba(0,0,0,0.9)",
        // backgroundColor: "black",
        // background:
        //   "radial-gradient(ellipse at top, #f5f7fa), radial-gradient(ellipse at bottom, #602a90);",
        padding: "15px",
        borderRadius: "5px",
        // border: "5px solid #f5f7fa",
      }}
    >
      <Grid
        container
        sx={{
          display: "grid",
          paddingTop: "5px",
          alignItems: "center",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(4, max-content)",
          gridTemplateAreas: `"titulo titulo paciente paciente paciente paciente"
                " fecha fecha horaIni  horaIni horaFin horaFin "
                " motivo motivo motivo motivo motivo motivo"
                " btnReg btnReg btnReg btnReg btnReg btnReg"`,
          rowGap: "30px",
          columnGap: "10px",
        }}
      >
        <Grid item gridArea="titulo" display="flex" justifyContent="start">
          <Typography
            fontSize="20px"
            fontStyle="italic"
            fontWeight="bold"
            color="#02ECEE"
          >
            Cita Agendada
          </Typography>
        </Grid>

        <Grid item gridArea="paciente">
          <IconTextField
            autoFocus
            fullWidth
            label="Paciente:"
            type="text"
            // defaultValue={"Hello World"}
            value={activeCita.Paciente}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorTxt="white"
            colorLabel="blueSecondary.main"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <PersonSearch />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="fecha">
          <IconTextField
            autoFocus
            fullWidth
            label="Fecha:"
            type="text"
            value={activeCita.fecha_cita}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorTxt="white"
            colorLabel="blueSecondary.main"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <Event />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaIni">
          <IconTextField
            autoFocus
            fullWidth
            label="Hora Inicio:"
            type="text"
            value={activeCita.hora_inicio}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorTxt="white"
            colorLabel="blueSecondary.main"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaFin">
          <IconTextField
            autoFocus
            fullWidth
            label="Hora Fin:"
            type="text"
            value={activeCita.hora_fin}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorTxt="white"
            colorLabel="blueSecondary.main"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="motivo">
          <IconTextField
            autoFocus
            fullWidth
            label="Motivo de consulta:"
            type="text"
            value={activeCita.moti_citaAgen}
            colorIcon="blueSecondary.main"
            colorHover="#02ECEE"
            colorTxt="white"
            colorLabel="blueSecondary.main"
            font_we="bold"
            font_sty="italic"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <SegmentOutlined />
              </Icon>
            }
          />
        </Grid>

        <Grid
          item
          gridArea="btnReg"
          display="flex"
          flexDirection="row"
          columnGap="10px"
          rowGap="10px"
          justifyContent="center"
        >
          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="error.main"
            colorth="white"
            colort="black"
            txt_b="Eliminar"
            // {txtButton}
            iconB={<DeleteOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="blueSecondary.main"
            colorth="white"
            colort="black"
            txt_b="Editar"
            onClick={openFormEditCite}
            iconB={<EditOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            altura="40px"
            colorf="white"
            colorh="primary.main"
            colort="black"
            colorth="white"
            txt_b="Atender"
            // {txtButton}
            iconB={<PostAddOutlined />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

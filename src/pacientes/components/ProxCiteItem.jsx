import { Box, Grid, Icon } from "@mui/material";
import { ButtonCustom, IconTextField } from "../../ui";
import {
  AccessTime,
  DeleteOutlined,
  EditOutlined,
  Event,
  PostAddOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import { extraerFecha } from "../../agenda/helpers/formatedDataCite";

export const ProxCiteItem = ({ cita }) => {
  return (
    <>
      {/* <Box width="90%"> */}
      <Grid
        container
        display="grid"
        // flexDirection="row"
        boxShadow="5px 7px 7px rgba(0, 0, 0, 0.5)"
        sx={{
          //
          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.6)",
          // backgroundColor: `${
          //   cita.esta_citaAgen === "Pendiente"
          //     ? "blueSecondary.main"
          //     : "error.main"
          // }`,
          // alignItems: "center",
          gridTemplateColumns: "10% 75% 15%",
          gridTemplateRows: "repeat(3, max-content)",
          gridTemplateAreas: `"icono dates botones" 
              "icono motivo botones" 
              "icono motivo botones"`,
        }}
      >
        <Grid
          item
          gridArea="icono"
          display="flex"
          alignItems="start"
          justifyContent="center"
        >
          <img
            type="img/svg"
            width="60px"
            height="60px"
            src={`../../../public/assets/icons/dentist_date.svg`}
            alt="dentist_date.svg"
          />
        </Grid>

        <Grid
          item
          gridArea="dates"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          columnGap="20px"
        >
          <div>
            <IconTextField
              label="Fecha:"
              type="text"
              //   value={"2023/06/14"}
              // value={activeCita.fecha_cita}
              value={extraerFecha(new Date(cita.fecha_citaAgen))}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
              }}
              iconEnd={
                <Icon>
                  <Event />
                </Icon>
              }
            />
          </div>
          <div>
            <IconTextField
              label="Hora Inicio:"
              type="text"
              value={cita.horaIni_citaAgen.substring(0, 5)}
              // value={activeCita.hora_inicio}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
              }}
              iconEnd={
                <Icon>
                  <AccessTime />
                </Icon>
              }
            />{" "}
          </div>
          <div>
            <IconTextField
              label="Hora Fin:"
              type="text"
              value={cita.horaFin_citaAgen.substring(0, 5)}
              // value={activeCita.hora_inicio}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              InputProps={{ readOnly: true }}
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
              }}
              iconEnd={
                <Icon>
                  <AccessTime />
                </Icon>
              }
            />{" "}
          </div>
        </Grid>

        <Grid item gridArea="motivo">
          <div style={{ marginTop: "20px" }}>
            <IconTextField
              fullWidth
              label="Motivo de consulta:"
              multiline
              type="text"
              // value={activeCita.moti_citaAgen}
              value={cita.moti_citaAgen}
              colorIcon="primary.main"
              colorHover="primary.main"
              colorTxt="black"
              colorLabel="primary.main"
              font_we="bold"
              font_sty="italic"
              propsXS={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "2px solid",
                    borderColor: "primary.main",
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#602A90 !important ",
                },
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)  !important",
              }}
              InputProps={{ readOnly: true }}
              iconEnd={
                <Icon>
                  <SegmentOutlined />
                </Icon>
              }
            />
          </div>
        </Grid>

        <Grid
          item
          gridArea="botones"
          display="flex"
          flexDirection="column"
          rowGap="10px"
          alignItems="center"
          justifyContent="center"
        >
          <ButtonCustom
            // tipoBtn="submit"
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="error.main"
            colorth="white"
            colort="white"
            txt_b="Eliminar"
            // onClick={openFormDeleteCite}
            iconB={<DeleteOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="blueSecondary.main"
            colorth="white"
            colort="white"
            txt_b="Editar"
            // onClick={openFormEditCite}
            iconB={<EditOutlined />}
          />

          <ButtonCustom
            // tipoBtn="submit"
            txt_b_size="13px"
            altura="35px"
            colorf="primary.main"
            colorh="black"
            colort="white"
            colorth="celesteNeon.main"
            txt_b="Atender"
            iconB={<PostAddOutlined />}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

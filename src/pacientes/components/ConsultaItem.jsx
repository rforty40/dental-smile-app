import { Box, Grid, Icon, TextField, Typography } from "@mui/material";
import { ButtonCustom, CustomStandardTF, IconTextField } from "../../ui";
import {
  AccessTime,
  DeleteOutlined,
  EditNoteOutlined,
  EditOutlined,
  Event,
  PostAddOutlined,
  SegmentOutlined,
} from "@mui/icons-material";

import { useAgendaStore, usePacienteStore } from "../../hooks";
import { invertDateFormat } from "../../agenda/helpers/formatedDataCite";

export const ConsultaItem = ({ consultaItem, iteratorColor }) => {
  console.log(consultaItem);

  const colorChoose = iteratorColor % 2 > 0 ? true : false;

  // const {
  //   changeStateFormAgenda,
  //   changeTitleFormAgenda,
  //   changeBlockPaciente,
  //   changeDataCite,
  //   changeStateDeleteCofirm,
  // } = useAgendaStore();

  // const { pacienteActivo } = usePacienteStore();

  // const handleOpenFormEditCite = () => {
  //   changeDataCite(cita);
  //   changeTitleFormAgenda(
  //     "Editar cita odontológica de " + pacienteActivo.nombre
  //   );
  //   changeStateFormAgenda(true);
  //   changeBlockPaciente(true);
  // };

  // const handleOpenFormDeleteCite = () => {
  //   changeDataCite(cita);
  //   changeStateDeleteCofirm(true);
  // };

  const diagnosticosStr = consultaItem.diagnositcos.reduce((acc, diag) => {
    acc = `${acc}\n${
      diag.Diagnosticos.split("-")[0] +
      "-" +
      diag.Diagnosticos.split("-")[1].slice(0, 2) +
      diag.Diagnosticos.split("-")[1].slice(2).toLowerCase()
    }`;
    return acc;
  }, "");
  console.log(diagnosticosStr);

  return (
    <>
      {/* <Box width="90%"> */}
      <Grid
        container
        display="grid"
        // flexDirection="row"
        // border="2px solid"
        boxShadow="3px 5px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          //
          cursor: "pointer",
          padding: "20px 0px",
          marginTop: "5px",
          borderRadius: "10px",
          transitionProperty: "transform",
          // transitionDelay: "0.1s",
          transition: "all 0.1s ease-in-out",
          // backgroundColor: "rgba(255,255,255,0.6)",
          ":hover": {
            transform: "scale(1.04)",
          },
          // backgroundColor: "myBgColor.main",
          backgroundColor: colorChoose ? "primary.main" : "white",
          // alignItems: "center",
          gridTemplateColumns: "8% 62% 20% 10%",
          gridTemplateRows: "repeat(2, max-content)",
          gridTemplateAreas: `". . infoCons infoCons" 
              "icono motivo motivo botones"`,

          rowGap: "15px",
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
            width="65px"
            height="65px"
            src={`/assets/icons/consultaItem/icon_consulta_${
              colorChoose ? "white" : "primary"
            }.svg`}
            alt="dentist_date.svg"
          />
        </Grid>

        <Grid
          item
          gridArea="infoCons"
          display="flex"
          flexDirection="row"
          alignItems="start"
          justifyContent="center"
          columnGap="15px"
        >
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.hora_consulta}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {invertDateFormat(consultaItem.fecha_consulta)}
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              backgroundColor: colorChoose ? "white" : "primary.main",
              color: colorChoose ? "black" : "white",
              fontWeight: colorChoose && "bold",
              padding: "0.5px 4px",
            }}
          >
            {consultaItem.dias}
          </Typography>
        </Grid>

        {/* <Grid
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
              // value={cita.fecha_cita}
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
              // value={cita.hora_inicio}
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
              // value={cita.hora_fin}
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
        </Grid> */}

        <Grid
          item
          gridArea="motivo"
          display="flex"
          rowGap="15px"
          flexDirection="column"
        >
          <CustomStandardTF
            value={consultaItem.tipo_tipoConsul}
            helperText="Tipo de consulta"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />
          <CustomStandardTF
            multiline
            value={consultaItem.mot_consulta}
            helperText="Motivo"
            colorTxt={colorChoose ? "white" : "black"}
            colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
            colorBrd={colorChoose ? "white" : "#602A90"}
          />

          {diagnosticosStr.length > 0 && (
            <CustomStandardTF
              multiline
              value={diagnosticosStr}
              helperText="Diagnóstico"
              colorTxt={colorChoose ? "white" : "black"}
              colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
              colorBrd={colorChoose ? "white" : "#602A90"}
            />
          )}

          {consultaItem.tratamientos.length > 0 &&
            consultaItem.tratamientos.map((tratam) => {
              return (
                <>
                  <CustomStandardTF
                    key={tratam.id_tratam}
                    multiline
                    value={"\n" + invertDateFormat(tratam.Tratamiento)}
                    helperText="Tratamiento"
                    colorTxt={colorChoose ? "white" : "black"}
                    colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                    colorBrd={colorChoose ? "white" : "#602A90"}
                  />

                  {
                    tratam.procedimientos.length > 0 && (
                      // tratam.procedimientos.map((proced, index) => {
                      // return (
                      <CustomStandardTF
                        // key={index}
                        multiline
                        // value={proced.Procedimiento}
                        line_he="30px"
                        propsSX={{ paddingLeft: "40px" }}
                        value={tratam.procedimientos.reduce(
                          (acc, procAct, index) => {
                            if (index === 0) {
                              acc = `${procAct.Procedimiento}`;
                            } else {
                              acc = `${acc}\n${procAct.Procedimiento}`;
                            }
                            return acc;
                          },
                          ""
                        )}
                        helperText="Procedimientos"
                        colorTxt={colorChoose ? "white" : "black"}
                        colorHelp={colorChoose ? "#02ECEE" : "#602A90"}
                        colorBrd={colorChoose ? "white" : "#602A90"}
                      />
                    )
                    // );
                    // })
                  }
                </>
              );
            })}
        </Grid>

        <Grid
          item
          gridArea="botones"
          display="flex"
          flexDirection="column"
          rowGap="20px"
          alignItems="center"
          justifyContent="start"
        >
          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "blueSecondary.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Editar"
            fontW="bold"
            // onClick={handleOpenFormEditCite}
            iconB={<EditNoteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />

          <ButtonCustom
            txt_b_size="13px"
            altura="35px"
            colorf="transparent"
            colorh="transparent"
            colort={colorChoose ? "white" : "error.main"}
            colorth={colorChoose ? "celesteNeon.main" : "primary.main"}
            flexDir="column-reverse"
            txt_b="Eliminar"
            fontW="bold"
            // onClick={handleOpenFormDeleteCite}
            iconB={<DeleteOutlined />}
            propsXS={{ boxShadow: "none !important" }}
          />
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import {
  ButtonCustom,
  CustomAlert,
  CustomDatePickerAntd,
  CustomRangeDate,
  CustomSelect,
  DeleteConfirm,
} from "../../ui";
import { FaNotesMedical } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  addZeroStr,
  arrMes,
  extraerFecha,
} from "../../agenda/helpers/formatedDataCite";

import { DeleteForever, ExpandMore, SearchOutlined } from "@mui/icons-material";

import {
  useAgendaStore,
  useConsultasStore,
  usePacienteStore,
} from "../../hooks";
import { ProxCiteItem } from "../components/ProxCiteItem";
import { AgendaModal } from "../../agenda/components";
//
//
//
export const HistorialPagePaciente = () => {
  //

  const {
    futurasCitasList,
    startLoadFuturasCitas,

    pacienteActivo,
  } = usePacienteStore();

  const { consultasList, errorLoadConsultas, startLoadConsultas } =
    useConsultasStore();

  useEffect(() => {
    startLoadConsultas("no_filtros", "_", "_");
  }, []);

  const {
    stateOpenFormAgenda,
    changeStateFormAgenda,
    changeTitleFormAgenda,
    changeBlockPaciente,
    changeDataCite,
    startDeletingCite,
    stataOpenDeleteConf,
    changeStateDeleteCofirm,
  } = useAgendaStore();

  //hooks
  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    values: null,
    fechaIni: "_",
    fechaFin: "_",
  });

  //hook date año
  const [statePickerYear, setStatePickerYear] = useState({
    valueYear: null,
    anioStr: "",
  });

  //hook date mes
  const [statePickerMonth, setStatePickerMonth] = useState({
    valueMonth: null,
    mesStr: "",
  });

  // hook paneles
  const [arrayPanel, setArrayPanel] = useState({});

  /*******************************************RANGO DE FECHA ******************************************************** */

  const onChangeRangeDates = (values, rangeString) => {
    //Limpiar los demas componentes

    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });

    //cambiar el rango de fecha
    setStateDatesRange({
      values,
      fechaIni: rangeString[0],
      fechaFin: rangeString[1],
    });
  };

  useEffect(() => {
    if (stateDatesRange.values !== null) {
      // startLoadPanel(
      //   "range",
      //   stateDatesRange.fechaIni + " 00:00:00",
      //   stateDatesRange.fechaFin + " 23:59:59"
      // );
      // startLoadGanancias(
      //   "range",
      //   stateDatesRange.fechaIni + " 00:00:00",
      //   stateDatesRange.fechaFin + " 23:59:59"
      // );
    }
  }, [stateDatesRange]);

  /*******************************************  AÑO  ******************************************************** */

  const onChangeYear = (date, dateString) => {
    //Limpiar los demas componentes
    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerMonth({
      valueMonth: null,
      mesStr: "",
    });

    //cambiar el año
    setStatePickerYear({
      valueYear: date,
      anioStr: dateString,
    });
  };

  useEffect(() => {
    if (statePickerYear.valueYear !== null) {
      // startLoadPanel("anio", statePickerYear.anioStr, "_");
      // startLoadGanancias("anio", statePickerYear.anioStr, "_");
    }
  }, [statePickerYear]);

  /*******************************************  MES  ******************************************************** */

  const onChangeMonth = (date, dateString) => {
    //Limpiar los demas componentes

    setStateDatesRange({ ...stateDatesRange, values: null });
    setStatePickerYear({
      valueYear: null,
      anioStr: "",
    });

    //cambiar el mes
    setStatePickerMonth({
      valueMonth: date,
      mesStr: dateString,
    });
  };

  useEffect(() => {
    if (statePickerMonth.valueMonth !== null) {
      const mesAnio =
        statePickerMonth.mesStr.split(" ")[1] +
        addZeroStr(arrMes.indexOf(statePickerMonth.mesStr.split(" ")[0]) + 1);

      // startLoadPanel("mes", mesAnio, "_");
      // startLoadGanancias("mes", mesAnio, "_");
    }
  }, [statePickerMonth]);

  const funcSearch = () => {
    // startLoadFuturasCitas(stateDatesRange.fechaIni, stateDatesRange.fechaFin);
  };

  //estado de los expansion Panel
  const handlerPanel = (mes, isExpanded) => {
    setArrayPanel({ ...arrayPanel, [`${mes}`]: isExpanded });
  };

  useEffect(() => {
    funcSearch();
  }, [
    pacienteActivo,
    stateDatesRange,
    stateOpenFormAgenda,
    stataOpenDeleteConf,
  ]);

  //Todo modal consulta
  const handleOpenModalAgenda = () => {
    changeTitleFormAgenda(
      "Agendar cita odontológica para " + pacienteActivo.nombre
    );
    changeStateFormAgenda(true);
    changeBlockPaciente(true);
    changeDataCite({
      start: new Date(),
      end: new Date(0, 0, 0, new Date().getHours() + 2),
    });
  };

  //control alert
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //Confirm Dialog
  const deleteRegisterCita = () => {
    startDeletingCite();
    handleOpenSnackbar();
  };

  const customFormat = (value) => {
    return arrMes[value["$d"].getMonth()] + " " + value["$d"].getFullYear();
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: " url(/assets/img/fondohistory.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="headerFutCitas animate__animated animate__fadeInDown animate__faster">
        <Box
          width="100%"
          padding="30px"
          display="flex"
          alignItems="center"
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            columnGap="10px"
            alignItems="center"
            justifyContent="center"
          >
            {/* selector de mes */}
            <CustomDatePickerAntd
              placeholder="Mes/Año"
              value={statePickerMonth.valueMonth}
              onChange={onChangeMonth}
              format={customFormat}
              picker="month"
              sxProps={{ width: "175px" }}
            />

            {/* selector año */}
            <CustomDatePickerAntd
              placeholder="Año"
              value={statePickerYear.valueYear}
              onChange={onChangeYear}
              picker="year"
              sxProps={{ width: "130px" }}
            />

            <CustomRangeDate
              value={stateDatesRange.values}
              onChange={onChangeRangeDates}
            />
          </Box>

          <ButtonCustom
            altura={"50px"}
            colorf={"rgba(255,255,255,0.8)"}
            colorh={"primary.main"}
            colort={"primary.main"}
            colorth={"white"}
            txt_b={"Registrar consulta"}
            flexDir="row"
            txt_b_size="16px"
            fontW="bold"
            propsXS={{
              boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
              // width: "100px",
            }}
            iconB={<FaNotesMedical />}
            onClick={handleOpenModalAgenda}
          />
        </Box>
      </div>
      <div
        className="animate__animated animate__fadeInRight animate__faster"
        style={{ padding: "30px" }}
      >
        {consultasList !== null ? (
          errorLoadConsultas !== null ? (
            <Typography variant="h5" margin="20px">
              {errorLoadConsultas}
            </Typography>
          ) : (
            consultasList.map((consultasArr) => {
              //longitud de los arreglos

              const longArrCons =
                consultasArr[Object.keys(consultasArr)[0]].length;
              if (longArrCons > 0) {
                const titleMes = Object.keys(consultasArr)[0];
                return (
                  <Accordion
                    key={titleMes}
                    expanded={arrayPanel[`${titleMes}`]}
                    onChange={(event, isExpanded) => {
                      handlerPanel(titleMes, isExpanded);
                    }}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.7)",
                      marginBottom: "20px",
                      boxShadow: "5px 7px 7px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      sx={{
                        borderBottom: "3px solid",
                        borderBottomColor: "blueSecondary.main",

                        svg: {
                          color: "blueSecondary.main",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          marginRight: "15px",
                        }}
                      >
                        <Typography
                          fontStyle="italic"
                          fontWeight="bold"
                          textTransform="capitalize"
                          fontSize="20px"
                          color="blueSecondary.main"
                        >
                          {titleMes.replace("_", " ")}
                        </Typography>

                        <Typography
                          fontStyle="italic"
                          fontWeight="bold"
                          textTransform="capitalize"
                          fontSize="20px"
                          color="blueSecondary.main"
                        >{`(${longArrCons})`}</Typography>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "30px 20px 60px 20px ",
                      }}
                    >
                      <Box
                        width="95%"
                        display="flex"
                        flexDirection="column"
                        rowGap="20px"
                      >
                        {consultasArr[Object.keys(consultasArr)[0]].map(
                          (consulta, index) => {
                            return (
                              <Typography
                                key={consulta.id_consulta}
                                sx={{
                                  color:
                                    (index + 1) % 2 > 0 ? "orange" : "blue",
                                }}
                              >
                                {JSON.stringify(consulta)}
                              </Typography>
                            );
                          }
                        )}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              }
            })
          )
        ) : (
          ""
        )}
      </div>
      <AgendaModal />

      <DeleteConfirm
        stateOpen={stataOpenDeleteConf}
        setStateOpen={changeStateDeleteCofirm}
        message={
          <>
            ¿Está segura que desea eliminar la cita agendada de
            <span style={{ color: "#9c27b0" }}>
              {pacienteActivo.nombre !== undefined &&
                ` ${pacienteActivo.nombre}`}
            </span>
            ?
          </>
        }
        funcionDelete={deleteRegisterCita}
      />
      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={"Cita eliminada"}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<DeleteForever sx={{ color: "white" }} />}
      />
    </div>
  );
};

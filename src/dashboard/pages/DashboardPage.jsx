import { Box, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDashboardStore, useUiStore } from "../../hooks";
import { CustomDatePicker, CustomRangeDate, Topbar } from "../../ui";

import {
  addZeroStr,
  arrMes,
  extraerFecha,
} from "../../agenda/helpers/formatedDataCite";

import {
  CardDashboard,
  MenuListDashboard,
  MyButtonInGroup,
} from "../components";

export const DashboardPage = () => {
  //

  const { changePage } = useUiStore();

  useEffect(() => {
    console.log("DashboardPage");
    changePage();
  }, []);

  const {
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,
    totallistGastos,
    totallistIngreso,
    startLoadPanel,
    startLoadGanancias,
  } = useDashboardStore();

  const [stateToogleBtns, setStateToogleBtns] = useState("sem_act");

  const [typeConsulta, setTypeConsulta] = useState(false);

  const handleChangeToogleBtn = (event, newAlignment) => {
    setStateToogleBtns(newAlignment);
  };

  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    fechaIni: "_",
    fechaFin: "_",
  });
  const setearFechas = (values) => {
    if (values === null) {
      setStateDatesRange({
        fechaIni: "_",
        fechaFin: "_",
      });
    } else {
      setTypeConsulta("range");
      setStateDatesRange({
        fechaIni: extraerFecha(values[0]["$d"]).replaceAll("/", "-"),
        fechaFin: extraerFecha(values[1]["$d"]).replaceAll("/", "-"),
      });
    }
  };

  //hook date año
  const [stateDatePickerYear, setStateDatePickerYear] = useState(new Date());
  //hook date mes
  const [stateDatePickerMonth, setStateDatePickerMonth] = useState(
    new Date().getMonth()
  );

  const onChangeDatePickerYear = (newValue) => {
    setTypeConsulta("anio");
    // setStateDatePickerMonth(12);
    setStateDatePickerYear(newValue);
  };

  const onChangeDatePickerMoth = (newValue) => {
    setTypeConsulta("mes");
    setStateDatePickerMonth(newValue.getMonth());
  };

  useEffect(() => {
    console.log(stateToogleBtns);
    if (stateToogleBtns) {
      startLoadPanel(stateToogleBtns, "_", "_");
      startLoadGanancias(stateToogleBtns, "_", "_");
    }
    //funcion de buscar
  }, [stateToogleBtns]);

  useEffect(() => {
    console.log(addZeroStr(stateDatePickerMonth + 1));
    console.log(stateDatePickerYear.getFullYear().toString());

    console.log(stateDatesRange.fechaIni + " 00:00:00");
    console.log(stateDatesRange.fechaFin + " 23:59:59");

    if (typeConsulta) {
      switch (typeConsulta) {
        case "anio":
          console.log(typeConsulta);
          startLoadPanel(
            typeConsulta,
            stateDatePickerYear.getFullYear().toString(),
            "_"
          );
          startLoadGanancias(
            typeConsulta,
            stateDatePickerYear.getFullYear().toString(),
            "_"
          );
          break;
        case "mes":
          console.log(typeConsulta);
          startLoadPanel(
            typeConsulta,
            stateDatePickerYear.getFullYear().toString() +
              addZeroStr(stateDatePickerMonth + 1),
            "_"
          );
          startLoadGanancias(
            typeConsulta,
            stateDatePickerYear.getFullYear().toString() +
              addZeroStr(stateDatePickerMonth + 1),
            "_"
          );
          break;
        case "range":
          console.log(typeConsulta);
          break;

        default:
          break;
      }
    }
    setTypeConsulta(null);
  }, [stateDatesRange, stateDatePickerMonth, stateDatePickerYear]);

  useEffect(() => {
    if (setTypeConsulta === null) {
      stateDatePickerMonth(12);
    }
  }, [setTypeConsulta]);

  const openPanelPacientes = () => {
    console.log("Abriendo panel paciente");
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.3),rgba(250,250,250, 0.3)), url(../../../public/assets/img/fondo_administracion3.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        objectPosition: "center",
      }}
    >
      <div style={{ backgroundColor: "#f5f7fa" }}>
        <Topbar />
      </div>
      <Box
        className="box-shadow animate__animated animate__fadeIn"
        margin="30px"
        padding="30px"
        display="flex"
        flexDirection="column"
        rowGap="20px"
        sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* botones dia, semana, mes, año */}
          <ToggleButtonGroup
            size="medium"
            exclusive
            value={stateToogleBtns}
            onChange={handleChangeToogleBtn}
            sx={{
              margin: "2px",
              height: "41px",
              boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
              ":hover": {
                boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <MyButtonInGroup value="dia_act" text={"Día"} />
            <MyButtonInGroup value="sem_act" text={"Semana"} />
            <MyButtonInGroup value="mes_act" text={"Mes"} />
            <MyButtonInGroup value="ani_act" text={"Año"} />
          </ToggleButtonGroup>

          {/* selector de fechas, año, rango de fecha */}
          <Box display="flex" flexDirection="row" columnGap="5px">
            <CustomDatePicker
              label={"Mes"}
              views={["month"]}
              altura={"41px"}
              propsXS={{
                height: "41px",
                margin: "2px",
                width: "150px",
              }}
              // value={stateDatePicker}
              onChange={onChangeDatePickerMoth}
              slotProps={{
                textField: {
                  onKeyDown: (e) => {
                    e.preventDefault();
                  },
                  inputProps: {
                    value: arrMes[parseInt(stateDatePickerMonth)],
                  },
                },
              }}
            />

            <CustomDatePicker
              label={"Año"}
              views={["year"]}
              altura={"41px"}
              propsXS={{
                height: "41px",
                margin: "2px",
                width: "100px",
              }}
              value={stateDatePickerYear}
              onChange={onChangeDatePickerYear}
              slotProps={{
                textField: {
                  onKeyDown: (e) => {
                    e.preventDefault();
                  },
                },
              }}
            />

            <CustomRangeDate onChange={setearFechas} />
          </Box>
        </Box>

        {/* cardDashboard */}
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <CardDashboard
            iconName={"patient_bed3"}
            resultado={listPacientesPanel.length}
            label={"Pacientes"}
            fncOnClick={openPanelPacientes}
          />
          <CardDashboard
            iconName={"calendar_molar"}
            resultado={listConsultasPanel.length}
            label={"Consultas"}
          />
          <CardDashboard
            iconName={"tool_dentist3"}
            resultado={listProcedimientosPanel.length}
            label={"Procedimientos"}
          />
          <CardDashboard
            iconName={"ganancias3"}
            resultado={`$${parseFloat(totallistIngreso - totallistGastos)}`}
            label={"Ganancias"}
          />
        </Box>
      </Box>

      <Box
        className="animate__animated animate__fadeIn"
        margin="30px 30px 0px 30px"
        display="flex"
        // flexDirection="column"
        flexWrap="wrap"
        rowGap="15px"
        columnGap="15px"
        // sx={{ backgroundColor: "white" }}
      >
        <MenuListDashboard txtLabel={"Lista de procedimientos odontologicos"} />
        <MenuListDashboard
          txtLabel={"Lista de tipos de consulta odontologicas"}
        />
        <MenuListDashboard txtLabel={"Lista de tipos de tratamientos"} />
        <MenuListDashboard txtLabel={"Lista de tipos de pagos"} />
        <MenuListDashboard txtLabel={"Lista de ingresos"} />
        <MenuListDashboard txtLabel={"Lista de gastos"} />
      </Box>
    </div>
  );
};

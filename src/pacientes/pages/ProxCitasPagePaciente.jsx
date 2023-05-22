import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { ButtonCustom, CustomRangeDate, CustomSelect } from "../../ui";

import { MdPostAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { extraerFecha } from "../../agenda/helpers/formatedDataCite";

import { ExpandMore, SearchOutlined } from "@mui/icons-material";

import { usePacienteStore } from "../../hooks";
import { ProxCiteItem } from "../components/ProxCiteItem";

//
//
//
export const ProxCitasPagePaciente = () => {
  //
  const { futurasCitasList, startLoadFuturasCitas, errorLoadFutCitas } =
    usePacienteStore();

  // useEffect(() => {
  //   startLoadFuturasCitas("Pendiente", "_", "_");
  // }, []);

  //hooks
  //rangoDeFechas
  const [stateDatesRange, setStateDatesRange] = useState({
    fechaIni: "_",
    fechaFin: "_",
  });
  const setearFechas = (values) => {
    values === null
      ? setStateDatesRange({
          fechaIni: "_",
          fechaFin: "_",
        })
      : setStateDatesRange({
          fechaIni: extraerFecha(values[0]["$d"]).replaceAll("/", "-"),
          fechaFin: extraerFecha(values[1]["$d"]).replaceAll("/", "-"),
        });
  };

  //estado citas
  const [stateCita, setStateCita] = useState("Pendientes");

  const funcSearch = () => {
    startLoadFuturasCitas(
      stateCita.slice(0, stateCita.length - 1),
      stateDatesRange.fechaIni,
      stateDatesRange.fechaFin
    );
  };

  useEffect(() => {
    funcSearch();
  }, [stateCita, stateDatesRange]);

  // const [colorHeader, setColorHeader] = useState(window.scrollY);
  // window.addEventListener("scroll", function () {
  //   const header = document.querySelector(".headerFutCitas");
  //   header.classList.toggle("headerFutCitasSticky", window.scrollY > 0);
  // });

  // const [expanded, setExpanded] = useState(false);

  // const handleChange = (panel) => (event, isExpanded) => {
  //   console.log(isExpanded);
  //   setExpanded(isExpanded ? panel : false);
  // };

  const [arrayPanel, setArrayPanel] = useState({});
  const handlerPanel = (mes, isExpanded) => {
    setArrayPanel({ ...arrayPanel, [`${mes}`]: isExpanded });
  };
  return (
    <div style={{ height: "100vh" }}>
      <div
        className="headerFutCitas animate__animated animate__fadeInDown animate__faster"
        // style={{
        //   position: "sticky",
        //   top: "72px",
        //   zIndex: "10000",
        // }}
      >
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
            alignItems="end"
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize="12px"
                fontWeight="bold"
                color="primary.main"
              >
                Rango de Fechas:
              </Typography>
              <CustomRangeDate onChange={setearFechas} />
            </Box>

            <Box display="flex" flexDirection="column">
              <CustomSelect
                lblText="Estado de las citas:"
                altura="42px"
                ancho="135px"
                listOptions={["Pendientes", "Perdidas"]}
                value={stateCita}
                onChange={(event) => {
                  setStateCita(event.target.value);
                }}
              />
            </Box>

            <Box margin="2px">
              <ButtonCustom
                colorBtn="secondary.main"
                altura={"42px"}
                colorf={"transparent"}
                colorh={"primary.main"}
                colort={"primary.main"}
                colorth={"white"}
                txt_b={"Buscar"}
                flexDir="row"
                txt_b_size="15px"
                fontW="bold"
                color
                propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
                onClick={funcSearch}
                iconB={<SearchOutlined />}
              />
            </Box>
          </Box>

          <ButtonCustom
            altura={"60px"}
            colorf={"rgba(255,255,255,0.6)"}
            colorh={"primary.main"}
            colort={"primary.main"}
            colorth={"white"}
            txt_b={"Agendar cita"}
            flexDir="column-reverse"
            txt_b_size="15px"
            fontW="bold"
            propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
            // onClick={openModalAnteceFaReg}
            iconB={<MdPostAdd />}
          />
        </Box>
      </div>
      <div
        className="animate__animated animate__fadeInRight animate__faster"
        style={{ padding: "30px" }}
      >
        {futurasCitasList !== null ? (
          errorLoadFutCitas !== null ? (
            <Typography variant="h5" margin="40px">
              {errorLoadFutCitas}
            </Typography>
          ) : (
            futurasCitasList.map((citaFu, index) => {
              //longitud de los arreglos

              const longArrCite = citaFu[Object.keys(citaFu)[0]].length;
              if (longArrCite > 0) {
                const titleMes = Object.keys(citaFu)[0];
                return (
                  // <Accordion
                  //   expanded={expanded === `panel${index}`}
                  //   onChange={handleChange(`panel${index}`)}
                  // >
                  <Accordion
                    expanded={arrayPanel[`${titleMes}`]}
                    onChange={(event, isExpanded) => {
                      handlerPanel(titleMes, isExpanded);
                    }}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        fontStyle="italic"
                        fontWeight="bold"
                        textTransform="capitalize"
                        fontSize="20px"
                        color={
                          stateCita === "Pendientes"
                            ? "blueSecondary.main"
                            : "error.main"
                        }
                      >
                        {titleMes.replace("_", " ")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box
                        width="90%"
                        display="flex"
                        flexDirection="column"
                        rowGap="20px"
                      >
                        {citaFu[Object.keys(citaFu)[0]].map((cita) => {
                          return (
                            <ProxCiteItem
                              key={cita.fecha_citaAgen + cita.horaIni_citaAgen}
                              cita={cita}
                            />
                          );
                        })}
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
    </div>
  );
};

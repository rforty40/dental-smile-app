import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useAntecedenteStore, usePacienteStore, useUiStore } from "../../hooks";
import {
  CalendarMonth,
  ContactPage,
  MedicalInformation,
} from "@mui/icons-material";
import { InfoPagePaciente } from "./InfoPagePaciente";
import { HistorialPagePaciente } from "./HistorialPagePaciente";
import { useParams } from "react-router-dom";
import { ProxCitasPagePaciente } from "./ProxCitasPagePaciente";

//
//
//
export const PacienteHistorial = () => {
  //

  const { changePage } = useUiStore();

  const { pacienteActivo, startLoadPaciente } = usePacienteStore();

  const { startLoadAntecedentes } = useAntecedenteStore();

  console.log(localStorage.getItem("lastTabPaciente"));
  const [hookTabs, setHookTabs] = useState(
    parseInt(localStorage.getItem("lastTabPaciente")) || 0
  );

  const handleChangeTabs = (event, newValue) => {
    setHookTabs(newValue);
    localStorage.setItem("lastTabPaciente", newValue);
  };

  const { id_pac } = useParams();

  useEffect(() => {
    changePage();
    startLoadPaciente(id_pac);
    startLoadAntecedentes(id_pac);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.2),rgba(250,250,250, 0.2)) , url(../../../public/assets/img/imgFondoPac.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0px 20px"
        position="sticky"
        top="0px"
        zIndex="10000"
        boxShadow="3px 3px 5px rgba(0, 0, 0, 0.5)"
        sx={{
          // backgroundColor: "rgba(245, 247, 250, 0.9)",
          backgroundColor: "myBgColor.main",
          // borderBottom: "2px solid grey",
        }}
      >
        <Typography
          variant="h3"
          color="black"
          fontWeight="bold"
          fontSize="25px"
          fontStyle="italic"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
        >
          Paciente:{" "}
          <span style={{ color: "#9c27b0" }}>
            {pacienteActivo && pacienteActivo.nombre}
          </span>
        </Typography>

        <Tabs value={hookTabs} onChange={handleChangeTabs}>
          <Tab
            sx={{ color: "black" }}
            icon={<ContactPage />}
            label="INFORMACIÓN"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<CalendarMonth />}
            label="PRÓXIMAS CITAS"
          />
          <Tab
            sx={{ color: "black" }}
            icon={<MedicalInformation />}
            label="HISTORIAL"
          />
        </Tabs>
      </Box>

      <Box height="100%">
        {hookTabs === 0 && <InfoPagePaciente />}
        {hookTabs === 1 && <ProxCitasPagePaciente />}
        {hookTabs === 2 && <HistorialPagePaciente />}
      </Box>
    </div>
  );
};

/* <Box height="100%" padding="20px">
        <div style={{ display: hookTabs === 0 ? "flex" : "none" }}>
          <InfoPagePaciente />
        </div>
        <div style={{ display: hookTabs === 1 ? "flex" : "none" }}>
          <HistorialPagePaciente />
        </div>
      </Box> */

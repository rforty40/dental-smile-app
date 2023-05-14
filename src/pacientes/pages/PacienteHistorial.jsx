import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { usePacienteStore, useUiStore } from "../../hooks";
import { ContactPage, MedicalInformation } from "@mui/icons-material";
import { InfoPagePaciente } from "./InfoPagePaciente";
import { HistorialPagePaciente } from "./HistorialPagePaciente";
import { useParams } from "react-router-dom";

//
//
//
export const PacienteHistorial = () => {
  const { changePage } = useUiStore();
  const [hookTabs, setHookTabs] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setHookTabs(newValue);
  };

  const { pacienteActivo, startLoadPaciente } = usePacienteStore();

  const { id_pac } = useParams();

  useEffect(() => {
    changePage();
    startLoadPaciente(id_pac);
  }, []);

  const a = "../../../public/assets/img/imgFondoPac.jpg";
  return (
    <div
      style={{
        height: "100%",
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
        sx={{
          // backgroundColor: "rgba(245, 247, 250, 0.9)",
          backgroundColor: "myBgColor.main",
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
            icon={<MedicalInformation />}
            label="HISTORIAL"
          />
        </Tabs>
      </Box>

      <Box height="100%" padding="20px">
        <div style={{ display: hookTabs === 0 ? "flex" : "none" }}>
          <InfoPagePaciente />
        </div>
        <div style={{ display: hookTabs === 1 ? "flex" : "none" }}>
          <HistorialPagePaciente />
        </div>
      </Box>
    </div>
  );
};

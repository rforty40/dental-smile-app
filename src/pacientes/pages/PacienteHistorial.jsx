import { useEffect, useState } from "react";
import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { CustomTable, DeleteConfirm } from "../../ui";
import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";
import { ContactPage, MedicalInformation } from "@mui/icons-material";
import { InfoPagePaciente } from "./InfoPagePaciente";
import { HistorialPagePaciente } from "./HistorialPagePaciente";

export const PacienteHistorial = () => {
  const { changePage } = useUiStore();

  useEffect(() => {
    console.log("PacienteHistorial Page");
    changePage();
  }, []);

  //funcion abrir modal formulario

  const { changeModalFormReg, pacienteActivo } = usePacienteStore();

  const openModalPaciente = () => {
    changeModalFormReg(true);
  };

  //
  const [hookTabs, setHookTabs] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setHookTabs(newValue);
  };
  const dataPacienteLocal = JSON.parse(localStorage.getItem("pacienteActivo"));

  return (
    <>
      <Box
        position="sticky"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0px 20px"
        sx={{
          // backgroundColor: "rgba(245, 247, 250, 0.9)",
          backgroundColor: "myBgColor.main",
        }}
      >
        <Typography
          paddingRight="180px"
          variant="h3"
          color="black"
          fontWeight="bold"
          fontSize="25px"
          fontStyle="italic"
          sx={{ textShadow: "0px 2px 2px rgba(0,0,0,0.20)  !important" }}
        >
          Paciente:{" "}
          <span style={{ color: "#9c27b0" }}>
            {pacienteActivo.nombre
              ? pacienteActivo.nombre
              : dataPacienteLocal.nombre}
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

      <Box
        height="100%"
        padding="20px"
        // sx={{ backgroundColor: "orange" }}
      >
        <div style={{ display: hookTabs === 0 ? "flex" : "none" }}>
          <InfoPagePaciente />
        </div>
        <div style={{ display: hookTabs === 1 ? "flex" : "none" }}>
          <HistorialPagePaciente />
        </div>
      </Box>

      <DeleteConfirm
        message={
          <>
            ¿Está segura que desea eliminar el registro de
            <span style={{ color: "#9c27b0" }}>
              {" "}
              {pacienteActivo.nombre
                ? pacienteActivo.nombre
                : dataPacienteLocal.nombre}{" "}
              -{" "}
              {pacienteActivo.cedula
                ? pacienteActivo.cedula
                : dataPacienteLocal.cedula}
            </span>
            ?
          </>
        }
      />
    </>
  );
};

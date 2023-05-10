import { useEffect, useState } from "react";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { CustomTable, DeleteConfirm } from "../../ui";
import { dataPacientes } from "./dataPacientes";
import { usePacienteStore, useUiStore } from "../../hooks";

import { FormModalPac } from "../components";
import { ContactPage, MedicalInformation } from "@mui/icons-material";

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

  return (
    <Box>
      <Box
        position="sticky"
        top="0px"
        display="flex"
        justifyContent="end"
        alignContent="end"
        alignItems="end"
        paddingRight="20px"
        sx={{
          backgroundColor: "rgba(245, 247, 250, 0.8)",
        }}
      >
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
        sx={
          {
            // backgroundImage: `linear-gradient(#f5f7fa,#a082bd)`,
          }
        }
      >
        <>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
          <h1>mostrar informacion</h1>
        </>
        {hookTabs === 0 && <h1>mostrar informacion</h1>}
        {hookTabs === 1 && <h1>mostrar historial</h1>}
      </Box>

      <DeleteConfirm
        message={
          <>
            ¿Está segura que desea eliminar el registro de
            <span style={{ color: "#9c27b0" }}>
              {" "}
              {pacienteActivo.nombre} - {pacienteActivo.cedula}
            </span>
            ?
          </>
        }
      />
    </Box>
  );
};

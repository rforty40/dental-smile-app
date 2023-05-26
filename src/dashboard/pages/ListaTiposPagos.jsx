import React, { useState } from "react";
import { useTipPagoStore } from "../../hooks/useTipPagoStore";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { ButtonCustom, CustomSelect, CustomTable } from "../../ui";
import { MdPostAdd } from "react-icons/md";
import { useDataStore } from "../../hooks";
import { FormTipPago } from "../components";

const TABLE_HEAD = [
  { id: "tipo_de_pago", label: "Tipo de pago", alignLeft: true },
  { id: "precio", label: "Precio", alignLeft: true },
];

/*******************************ListaTiposPagos*************************************** */

export const ListaTiposPagos = () => {
  //customs hooks store
  const { tipoPagosList, startLoadTipPagoList, changeDataTipPago } =
    useTipPagoStore();
  const { dataActiva } = useDataStore();

  //hooks
  const [stateTipo, setStateTipo] = useState("Todos");
  const [stateModalTipPago, setStateModalTipPago] = useState(false);
  const [titleFormTiPago, setTitleFormTiPago] = useState("");

  //control de modal registrar y editar
  const openModalTipPagoReg = () => {
    setTitleFormTiPago("Registro de tipo de pago");
    setStateModalTipPago(true);
  };

  const openModalTipPagoEdit = () => {
    setTitleFormTiPago("Editar tipo de pago");
    setStateModalTipPago(true);
  };

  //efectos secundarios
  useEffect(() => {
    let tipoConsulta = "";
    switch (stateTipo) {
      case "Todos":
        tipoConsulta = "todos";
        break;
      case "Tipos de pago por procedimientos":
        tipoConsulta = "procedimiento";
        break;
      case "Tipos de pago por tipos de consulta":
        tipoConsulta = "consulta";
        break;
      case "Tipos de pago creado por el usuario":
        tipoConsulta = "usuario";
        break;

      default:
        break;
    }
    startLoadTipPagoList(tipoConsulta, "_");
  }, [stateTipo]);

  useEffect(() => {
    changeDataTipPago(dataActiva);
  }, [dataActiva]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        width: "100%",

        backgroundImage:
          "linear-gradient(rgba(250,250,250, 0.1),rgba(250,250,250, 0.1)) , url(../../../public/assets/img/fondo_administracion1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        className="box-shadow animate__animated animate__fadeIn"
        // margin="30px"
        padding="20px"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.7)" }}
      >
        <Typography variant="h5" fontStyle="italic" fontWeight="bold">
          Lista de tipos de pagos
        </Typography>

        <Box
          display="flex"
          columnGap="20px"
          flexDirection="row"
          alignItems="end"
        >
          <CustomSelect
            lblText="Filtrar registros:"
            altura="42px"
            ancho="330px"
            listOptions={[
              "Todos",
              "Tipos de pago por procedimientos",
              "Tipos de pago por tipos de consulta",
              "Tipos de pago creado por el usuario",
            ]}
            value={stateTipo}
            onChange={(event) => {
              setStateTipo(event.target.value);
            }}
          />
          <ButtonCustom
            altura={"42px"}
            colorf={"primary.main"}
            colorh={"black"}
            colort={"white"}
            colorth={"celesteNeon.main"}
            txt_b={"Agregar tipo de pago"}
            flexDir="row"
            txt_b_size="17px"
            // fontW="bold"
            propsXS={{ boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)" }}
            iconB={<MdPostAdd />}
            onClick={openModalTipPagoReg}
          />
        </Box>
      </Box>
      <Box
        className="box-shadow animate__animated animate__fadeIn"
        margin="30px 30px 0px 30px"
        padding="10px"
        borderRadius="5px"
        // width="90%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      >
        <CustomTable
          TABLE_HEAD={TABLE_HEAD}
          DATALIST={tipoPagosList}
          withToolbar
          withBoxSearch
          withButton={false}
          iconosEnFila={false}
          columnaABuscarPri="tipo_de_pago"
          searchWhat={"Buscar tipo de pago ..."}
          txt_header={"Tipos de pago"}
          // bgHeaderColor={"transparent"}
          bgColorPagination="white"
          dataOmitida={3}
          openModalEdit={openModalTipPagoEdit}
          // funcionBtnTblDelete={handleOpenDialogDel}
          // funcionDeleteVarious={deleteRegisterPaciente}
        />
      </Box>
      <FormTipPago
        openModalForm={stateModalTipPago}
        setOpenModalForm={setStateModalTipPago}
        title={titleFormTiPago}
      />
    </div>
  );
};

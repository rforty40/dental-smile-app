import { useDispatch, useSelector } from "react-redux";
import { getGananciasData, getPanelData } from "../api/dashboard.api";
import {
  onLoadListConsPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListPacPanel,
  onLoadListProcedPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,
} from "../store";

export const useDashboardStore = () => {
  const dispatch = useDispatch();

  const {
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,

    //ganancias
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,
  } = useSelector((state) => state.dashboard);

  const startLoadPanel = async (tipo, param_fechaIni, fechaFin) => {
    //

    //Pacientes
    try {
      const { data: dataPacientes } = await getPanelData(
        "pacientes",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(dataPacientes);
      dispatch(onLoadListPacPanel(dataPacientes));
    } catch (error) {
      if (error.response.data.message.includes("pacientes")) {
        dispatch(onLoadListPacPanel([]));
      }
    }

    //Consultas
    try {
      const { data: dataConsultas } = await getPanelData(
        "consultas",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(dataConsultas);
      dispatch(onLoadListConsPanel(dataConsultas));
    } catch (error) {
      if (error.response.data.message.includes("consultas")) {
        dispatch(onLoadListConsPanel([]));
      }
    }

    //Procedimientos
    try {
      const { data: dataProcedimientos } = await getPanelData(
        "procedimientos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(dataProcedimientos);
      dispatch(onLoadListProcedPanel(dataProcedimientos));
    } catch (error) {
      if (error.response.data.message.includes("procedimientos")) {
        dispatch(onLoadListProcedPanel([]));
      }
    }
  };

  const startLoadGanancias = async (tipo, param_fechaIni, fechaFin) => {
    //ingresos
    try {
      const { data: dataIngresos } = await getGananciasData(
        "ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(dataIngresos);
      dispatch(onLoadListIngresoPanel(dataIngresos));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message.includes("ingresos")) {
        dispatch(onLoadListIngresoPanel([]));
      }
    }

    //totalDeIngreso
    try {
      const { data: totalIngresos } = await getGananciasData(
        "sum_ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(totalIngresos);
      let valorIngreso = 0;
      if (Object.values(totalIngresos[0])[0] !== null) {
        valorIngreso = parseFloat(Object.values(totalIngresos[0])[0]);
      }
      dispatch(onLoadListTotalIngreso(valorIngreso));
    } catch (error) {
      console.log(error.response.data.message);
    }

    //gastos
    try {
      const { data: dataGastos } = await getGananciasData(
        "gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(dataGastos);
      dispatch(onLoadListGastosPanel(dataGastos));
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response.data.message.includes("gastos")) {
        dispatch(onLoadListGastosPanel([]));
      }
    }

    //totalDeGastos
    try {
      const { data: totalGastos } = await getGananciasData(
        "sum_gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      console.log(totalGastos);
      let valorGasto = 0;
      if (Object.values(totalGastos[0])[0] !== null) {
        valorGasto = parseFloat(Object.values(totalGastos[0])[0]);
      }
      console.log(valorGasto);
      dispatch(onLoadListTotalGastos(valorGasto));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //
  //
  return {
    // * Propiedades
    listPacientesPanel,
    listConsultasPanel,
    listProcedimientosPanel,
    listGastosPanel,
    listIngresoPanel,
    totallistGastos,
    totallistIngreso,

    // * Métodos
    startLoadPanel,
    startLoadGanancias,
  };
};

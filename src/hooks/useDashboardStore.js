import { useDispatch, useSelector } from "react-redux";
import { getGananciasData, getPanelData } from "../api/dashboard.api";
import {
  onChangeMsgPanelCons,
  onChangeMsgPanelGanan,
  onChangeMsgPanelGastos,
  onChangeMsgPanelIngre,
  onChangeMsgPanelPac,
  onChangeMsgPanelProced,
  onLoadListConsPanel,
  onLoadListGastosPanel,
  onLoadListIngresoPanel,
  onLoadListPacPanel,
  onLoadListProcedPanel,
  onLoadListTotalGastos,
  onLoadListTotalIngreso,
} from "../store";
import {
  DiaActualFormated,
  arrMes,
  extraerFecha,
} from "../agenda/helpers/formatedDataCite";

import { endOfWeek, startOfWeek } from "date-fns";

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

    //Messages
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,
  } = useSelector((state) => state.dashboard);

  const startLoadPanel = async (tipo, param_fechaIni, fechaFin) => {
    //

    let parametroBusq = "";

    switch (tipo) {
      case "dia_act":
        let dia = DiaActualFormated(new Date());
        parametroBusq = dia.charAt(0).toUpperCase() + dia.slice(1);
        break;

      case "sem_act":
        parametroBusq = `${extraerFecha(
          startOfWeek(new Date(), { weekStartsOn: 1 })
        )} - ${extraerFecha(endOfWeek(new Date(), { weekStartsOn: 1 }))}`;
        break;

      case "mes_act":
        let mesAct = `${arrMes[new Date().getMonth()]}`;
        parametroBusq = `${
          mesAct.charAt(0).toUpperCase() + mesAct.slice(1)
        } ${new Date().getFullYear()}`;
        break;

      case "ani_act":
        parametroBusq = `${new Date().getFullYear()}`;
        break;

      case "mes":
        let mes = arrMes[parseInt(param_fechaIni.slice(4, 6)) - 1];
        parametroBusq = `${
          mes.charAt(0).toUpperCase() + mes.slice(1)
        } ${param_fechaIni.slice(0, 4)} `;
        break;

      case "anio":
        parametroBusq = `${param_fechaIni}`;
        break;

      case "range":
        parametroBusq = `desde: ${param_fechaIni.split(" ")[0]} hasta: ${
          fechaFin.split(" ")[0]
        }`;
        break;
      default:
        break;
    }

    //Pacientes
    try {
      const { data: dataPacientes } = await getPanelData(
        "pacientes",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataPacientes);
      dispatch(onLoadListPacPanel(dataPacientes));

      let msgPanelPac = "";
      switch (tipo) {
        case "dia_act":
          msgPanelPac = `Nuevos pacientes ingresados en este día `;
          break;

        case "sem_act":
          msgPanelPac = `Nuevos pacientes ingresados en esta semana `;
          break;

        case "mes_act":
          msgPanelPac = `Nuevos pacientes ingresados este mes de `;
          break;

        case "ani_act":
          msgPanelPac = `Nuevos pacientes ingresados este año `;
          break;

        case "mes":
          msgPanelPac = `Pacientes ingresados en `;
          break;

        case "anio":
          msgPanelPac = `Pacientes ingresados en el año `;
          break;

        case "range":
          msgPanelPac = `Pacientes ingresados `;
          break;
        default:
          break;
      }

      // console.log(msgPanelPac + parametroBusq);
      dispatch(onChangeMsgPanelPac(msgPanelPac + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("pacientes")) {
        dispatch(onLoadListPacPanel([]));
        dispatch(
          onChangeMsgPanelPac("No se registraron pacientes," + parametroBusq)
        );
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
      //console.log(dataConsultas);
      dispatch(onLoadListConsPanel(dataConsultas));

      let msgPanelCons = "";
      switch (tipo) {
        case "dia_act":
          msgPanelCons = `Consultas atendidas en este día `;
          break;

        case "sem_act":
          msgPanelCons = `Consultas atendidas en esta semana `;
          break;

        case "mes_act":
          msgPanelCons = `Consultas atendidas este mes de `;
          break;

        case "ani_act":
          msgPanelCons = `Consultas atendidas este año `;
          break;

        case "mes":
          msgPanelCons = `Consultas atendidas en `;
          break;

        case "anio":
          msgPanelCons = `Consultas atendidas en el año `;
          break;

        case "range":
          msgPanelCons = `Consultas atendidas `;
          break;
        default:
          break;
      }

      // console.log(msgPanelCons + parametroBusq);
      dispatch(onChangeMsgPanelCons(msgPanelCons + parametroBusq));
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
      //console.log(dataProcedimientos);
      dispatch(onLoadListProcedPanel(dataProcedimientos));

      let msgPanelProced = "";
      switch (tipo) {
        case "dia_act":
          msgPanelProced = `Procedimientos realizados en este día `;
          break;

        case "sem_act":
          msgPanelProced = `Procedimientos realizados en esta semana `;
          break;

        case "mes_act":
          msgPanelProced = `Procedimientos realizados este mes de `;
          break;

        case "ani_act":
          msgPanelProced = `Procedimientos realizados este año `;
          break;

        case "mes":
          msgPanelProced = `Procedimientos realizados en `;
          break;

        case "anio":
          msgPanelProced = `Procedimientos realizados en el año `;
          break;

        case "range":
          msgPanelProced = `Procedimientos realizados `;
          break;
        default:
          break;
      }

      // console.log(msgPanelProced + parametroBusq);
      dispatch(onChangeMsgPanelProced(msgPanelProced + parametroBusq));
    } catch (error) {
      if (error.response.data.message.includes("procedimientos")) {
        dispatch(onLoadListProcedPanel([]));
      }
    }
  };

  /***************************************************************************** */
  /***************************************************************************** */

  const startLoadGanancias = async (tipo, param_fechaIni, fechaFin) => {
    let parametroBusq = "";

    switch (tipo) {
      case "dia_act":
        let dia = DiaActualFormated(new Date());
        parametroBusq = dia.charAt(0).toUpperCase() + dia.slice(1);
        break;

      case "sem_act":
        parametroBusq = `${extraerFecha(
          startOfWeek(new Date(), { weekStartsOn: 1 })
        )} - ${extraerFecha(endOfWeek(new Date(), { weekStartsOn: 1 }))}`;
        break;

      case "mes_act":
        let mesAct = `${arrMes[new Date().getMonth()]}`;
        parametroBusq = `${
          mesAct.charAt(0).toUpperCase() + mesAct.slice(1)
        } ${new Date().getFullYear()}`;
        break;

      case "ani_act":
        parametroBusq = `${new Date().getFullYear()}`;
        break;

      case "mes":
        let mes = arrMes[parseInt(param_fechaIni.slice(4, 6)) - 1];
        parametroBusq = `${
          mes.charAt(0).toUpperCase() + mes.slice(1)
        } ${param_fechaIni.slice(0, 4)} `;
        break;

      case "anio":
        parametroBusq = `${param_fechaIni}`;
        break;

      case "range":
        parametroBusq = `desde: ${param_fechaIni.split(" ")[0]} hasta: ${
          fechaFin.split(" ")[0]
        }`;
        break;
      default:
        break;
    }

    //ingresos
    try {
      const { data: dataIngresos } = await getGananciasData(
        "ingresos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataIngresos);
      dispatch(onLoadListIngresoPanel(dataIngresos));

      let msgPanelIngre = "";
      switch (tipo) {
        case "dia_act":
          msgPanelIngre = `Ingresos en este día `;
          break;

        case "sem_act":
          msgPanelIngre = `Ingresos en esta semana `;
          break;

        case "mes_act":
          msgPanelIngre = `Ingresos este mes de `;
          break;

        case "ani_act":
          msgPanelIngre = `Ingresos este año `;
          break;

        case "mes":
          msgPanelIngre = `Ingresos en `;
          break;

        case "anio":
          msgPanelIngre = `Ingresos en el año `;
          break;

        case "range":
          msgPanelIngre = `Ingresos `;
          break;
        default:
          break;
      }

      // console.log(msgPanelIngre + parametroBusq);
      dispatch(onChangeMsgPanelIngre(msgPanelIngre + parametroBusq));
    } catch (error) {
      //console.log(error.response.data.message);
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
      //console.log(totalIngresos);
      let valorIngreso = 0;
      if (Object.values(totalIngresos[0])[0] !== null) {
        valorIngreso = parseFloat(Object.values(totalIngresos[0])[0]);
      }
      dispatch(onLoadListTotalIngreso(valorIngreso));
    } catch (error) {
      //console.log(error.response.data.message);
    }

    //gastos
    try {
      const { data: dataGastos } = await getGananciasData(
        "gastos",
        tipo,
        param_fechaIni,
        fechaFin
      );
      //console.log(dataGastos);
      dispatch(onLoadListGastosPanel(dataGastos));

      let msgPanelGastos = "";
      switch (tipo) {
        case "dia_act":
          msgPanelGastos = `Gastos en este día `;
          break;

        case "sem_act":
          msgPanelGastos = `Gastos en esta semana `;
          break;

        case "mes_act":
          msgPanelGastos = `Gastos este mes de `;
          break;

        case "ani_act":
          msgPanelGastos = `Gastos este año `;
          break;

        case "mes":
          msgPanelGastos = `Gastos en `;
          break;

        case "anio":
          msgPanelGastos = `Gastos en el año `;
          break;

        case "range":
          msgPanelGastos = `Gastos `;
          break;
        default:
          break;
      }

      // console.log(msgPanelGastos + parametroBusq);
      dispatch(onChangeMsgPanelGastos(msgPanelGastos + parametroBusq));
    } catch (error) {
      //console.log(error.response.data.message);
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
      //console.log(totalGastos);
      let valorGasto = 0;
      if (Object.values(totalGastos[0])[0] !== null) {
        valorGasto = parseFloat(Object.values(totalGastos[0])[0]);
      }
      //console.log(valorGasto);
      dispatch(onLoadListTotalGastos(valorGasto));
    } catch (error) {
      //console.log(error.response.data.message);
    }
  };

  //
  //

  // const changeMsgPanelPac = (msg) => {
  //   dispatch(onChangeMsgPanelPac(msg));
  // };
  // const changeMsgPanelCons = (msg) => {
  //   dispatch(onChangeMsgPanelCons(msg));
  // };
  // const changeMsgPanelProced = (msg) => {
  //   dispatch(onChangeMsgPanelProced(msg));
  // };
  // const changeMsgPanelIngre = (msg) => {
  //   dispatch(onChangeMsgPanelIngre(msg));
  // };
  // const changeMsgPanelGastos = (msg) => {
  //   dispatch(onChangeMsgPanelGastos(msg));
  // };
  // const changeMsgPanelGanan = (msg) => {
  //   dispatch(onChangeMsgPanelGanan(msg));
  // };
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
    messagePanelPac,
    messagePanelCons,
    messagePanelProced,
    messagePanelIngre,
    messagePanelGastos,
    messagePanelGananc,

    // * Métodos
    startLoadPanel,
    startLoadGanancias,
    // changeMsgPanelPac,
    // changeMsgPanelCons,
    // changeMsgPanelProced,
    // changeMsgPanelIngre,
    // changeMsgPanelGastos,
    // changeMsgPanelGanan,
  };
};

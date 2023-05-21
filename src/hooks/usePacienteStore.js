import { useDispatch, useSelector } from "react-redux";
import {
  changeErrorLoadFutCitas,
  // changeFormPacOpen,
  changeRegisterError,
  changeTitleForm,
  clearErrorMessage,
  onDeletePaciente,
  onLoadFuturasCitas,
  onLoadPacActivo,
  onLoadPacientesList,
  onLoadPacientesListBusq,
  onSavePaciente,
  onUpdatePaciente,
} from "../store";
import {
  getAllPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente,
  getPacienteById,
  getFuturasCitas,
} from "../api/pacientes.api";

import {
  comprobarError,
  formatearDataPacToBD,
  formatearDataPacToBusList,
  formatearDataPacToTable,
} from "../pacientes/helpers";

//
//

export const usePacienteStore = () => {
  //

  const dispatch = useDispatch();

  const {
    pacientesList,
    pacientesListBusq,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorRegMessage,
    futurasCitasList,
    errorLoadFutCitas,
  } = useSelector((state) => state.pacientes);

  const changeTitleFormReg = (title) => {
    dispatch(changeTitleForm(title));
  };

  const changeDataPaciente = (dataPac) => {
    dispatch(onLoadPacActivo(dataPac));
  };

  const startLoadPacientes = async () => {
    try {
      const { data } = await getAllPaciente();
      dispatch(onLoadPacientesList(formatearDataPacToTable(data)));

      dispatch(onLoadPacientesListBusq(formatearDataPacToBusList(data)));
    } catch (error) {
      console.log("Error cargando lista de pacientes");
      console.log(error);
    }
  };

  const startLoadPaciente = async (id) => {
    try {
      const { data } = await getPacienteById(id);

      dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
    } catch (error) {
      console.log("Error cargando datos del paciente por ID");
      console.log(error);
    }
  };

  const startSavingPaciente = async (dataPaciente) => {
    dispatch(clearErrorMessage());

    try {
      if (dataPaciente.id) {
        //actualizando
        const { data } = await updatePaciente(
          dataPaciente.id,
          formatearDataPacToBD(dataPaciente)
        );

        dispatch(onUpdatePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
      } else {
        //registrando
        const { data } = await createPaciente(
          formatearDataPacToBD(dataPaciente)
        );

        // console.log(data);
        dispatch(onSavePaciente(formatearDataPacToTable([data])[0]));
        dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
      }

      dispatch(changeRegisterError({ msg: "Sin errores", error: "" }));

      //
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterError({
          msg: "Hay errores",
          error: comprobarError(error.response.data.message),
        })
      );
    }
  };

  const startDeletingPaciente = async (id_paciente = []) => {
    try {
      if (id_paciente.length === 0) {
        await deletePaciente(pacienteActivo.id);
      } else {
        for (const i of id_paciente) {
          await deletePaciente(i);
        }
      }
      dispatch(onDeletePaciente(id_paciente));
      // console.log(pacienteActivo.id);
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadFuturasCitas = async (estadoCit, fechaIni, fechaFin) => {
    try {
      const { data } = await getFuturasCitas(
        pacienteActivo.id,
        estadoCit,
        fechaIni,
        fechaFin
      );

      let arrayCitesMonth = [
        { enero: [] },
        { febrero: [] },
        { marzo: [] },
        { abril: [] },
        { mayo: [] },
        { junio: [] },
        { julio: [] },
        { agosto: [] },
        { septiembre: [] },
        { octubre: [] },
        { noviembre: [] },
        { diciembre: [] },
      ];

      const arrMes = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];

      data.forEach((fecha) => {
        const posMes = new Date(fecha.fecha_citaAgen).getMonth();
        arrayCitesMonth[posMes][arrMes[posMes]].push(fecha);
      });

      dispatch(onLoadFuturasCitas(arrayCitesMonth));
      dispatch(changeErrorLoadFutCitas(null));
    } catch (error) {
      console.log("Error cargando lista de futuras citas");
      console.log(error.response.data.message);
      // if (error.response.data.message.includes("No se encontraron citas")) {
      dispatch(changeErrorLoadFutCitas(error.response.data.message));
      // }
    }
  };

  return {
    //* Propiedades
    pacientesList,
    pacientesListBusq,
    isFormPacOpen,
    titleForm,
    pacienteActivo,
    errorRegMessage,
    futurasCitasList,
    errorLoadFutCitas,

    //* Métodos
    changeTitleFormReg,
    changeDataPaciente,
    startLoadPacientes,
    startLoadPaciente,
    startSavingPaciente,
    startDeletingPaciente,
    startLoadFuturasCitas,
  };
};

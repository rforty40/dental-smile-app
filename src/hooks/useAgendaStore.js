import { useDispatch, useSelector } from "react-redux";
import { onLoadCitas, onSetActiveCita } from "../store";
import { getAllCites } from "../api/agenda.api";
import { formatedDataCite } from "../agenda/helpers/formatedDataCite";

//
//

export const useAgendaStore = () => {
  //

  const dispatch = useDispatch();

  const { citas, activeCita, errorRegCiteMessage } = useSelector(
    (state) => state.agenda
  );

  const changeDataCite = (dataCite) => {
    dispatch(onSetActiveCita(dataCite));
  };

  const startLoadCites = async () => {
    try {
      const { data } = await getAllCites();
      dispatch(onLoadCitas(formatedDataCite(data)));
    } catch (error) {
      console.log("Error cargando lista de citas");
      console.log(error);
    }
  };

  // const startSavingPaciente = async (dataPaciente) => {
  //   dispatch(clearErrorMessage());

  //   try {
  //     if (dataPaciente.id) {
  //       //actualizando
  //       const { data } = await updatePaciente(
  //         dataPaciente.id,
  //         formatearDataPacToBD(dataPaciente)
  //       );

  //       dispatch(onUpdatePaciente(formatearDataPacToTable([data])[0]));
  //       dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
  //     } else {
  //       //registrando
  //       const { data } = await createPaciente(
  //         formatearDataPacToBD(dataPaciente)
  //       );

  //       console.log(data);
  //       dispatch(onSavePaciente(formatearDataPacToTable([data])[0]));
  //       dispatch(onLoadPacActivo(formatearDataPacToTable([data])[0]));
  //     }

  //     dispatch(changeRegisterError({ msg: "Sin errores", error: "" }));

  //     //
  //   } catch (error) {
  //     console.log(error);
  //     console.log(error.response.data.message);
  //     dispatch(
  //       changeRegisterError({
  //         msg: "Hay errores",
  //         error: comprobarError(error.response.data.message),
  //       })
  //     );
  //   }
  // };

  // const startDeletingPaciente = async (id_paciente = []) => {
  //   try {
  //     if (id_paciente.length === 0) {
  //       await deletePaciente(pacienteActivo.id);
  //     } else {
  //       for (const i of id_paciente) {
  //         await deletePaciente(i);
  //       }
  //     }
  //     dispatch(onDeletePaciente(id_paciente));
  //     // console.log(pacienteActivo.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return {
    //* Propiedades
    citas,
    activeCita,
    errorRegCiteMessage,

    //* Métodos
    changeDataCite,
    startLoadCites,
  };
};

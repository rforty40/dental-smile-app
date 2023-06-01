import { useDispatch, useSelector } from "react-redux";
import {
  createConsulta,
  deleteConsulta,
  getConsultas,
  updateConsulta,
} from "../api/consultas.api";
import {
  changeErrorLoadConsultas,
  changeRegisterErrorCons,
  clearErrorMessageCons,
  onChangeOpenDelCons,
  onChangeOpenFormCons,
  onChangeTitleFormCons,
  onLoadConsultasList,
  onSetActivaConsulta,
} from "../store";
import { extractMesAnio } from "../agenda/helpers/formatedDataCite";
import {
  comprobarErrorCons,
  formatearDataConsToBD,
  formatedDataConsulta,
} from "../pacientes/helpers";

//
//

export const useConsultasStore = () => {
  //

  const dispatch = useDispatch();

  const {
    consultaActiva,
    consultasList,
    errorLoadConsultas,
    stateOpenFormCons,
    titleFormConsulta,
    errorMsgRegCons,
    stateOpenDelCons,
  } = useSelector((state) => state.consultas);

  //
  const { pacienteActivo } = useSelector((state) => state.pacientes);

  const changeStateFormCons = (flag) => {
    dispatch(onChangeOpenFormCons(flag));
  };

  const changeStateDelCons = (flag) => {
    dispatch(onChangeOpenDelCons(flag));
  };

  const changeDataConsulta = (consData) => {
    dispatch(onSetActivaConsulta(consData));
  };

  const changeTitleFormCons = (flag) => {
    dispatch(onChangeTitleFormCons(flag));
  };
  const startLoadConsultas = async (filtro, param1, param2) => {
    try {
      const { data } = await getConsultas(
        pacienteActivo.id,
        filtro,
        param1,
        param2
      );

      let arrayConsultasMonth = [];
      const arrMesAnio = [];

      const dataFormated = formatedDataConsulta(data);

      console.log(dataFormated);
      //1er bucle
      //para crear los elementos objetos del array, cuya unica llave es el nombre del mes + el año,
      // se usa un array para controlar que no se repitan los meses
      dataFormated.forEach((consulta) => {
        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        if (!arrMesAnio.includes(nameMesAnio)) {
          arrMesAnio.push(nameMesAnio);
          arrayConsultasMonth.push({ [nameMesAnio]: [] });
        }
      });

      let iterator = 0;

      //2do bucle
      //Buscar extraer mes de la consulta para que coincida con los objetos del primer bucle
      //buscar la ubicacion del array donde esta el objeto con la llave mes_año
      dataFormated.forEach((consulta) => {
        //

        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        arrayConsultasMonth.forEach((element, index) => {
          if (Object.keys(element)[0] === nameMesAnio) {
            iterator = index;
            return;
          }
        });

        arrayConsultasMonth[iterator][`${nameMesAnio}`].push(consulta);
      });
      dispatch(onLoadConsultasList(arrayConsultasMonth));
      dispatch(changeErrorLoadConsultas(null));

      //
    } catch (error) {
      console.log(error);
      console.log("Error cargando lista de futuras citas");
      console.log(error.response.data.message);
      dispatch(changeErrorLoadConsultas(error.response.data.message));
    }
  };

  const startSavingConsulta = async (consData) => {
    dispatch(clearErrorMessageCons());
    try {
      if (consData.id) {
        //actualizar
        await updateConsulta(
          pacienteActivo.id,
          consData.id,
          formatearDataConsToBD(consData)
        );
      } else {
        //registrar
        await createConsulta(
          pacienteActivo.id,
          formatearDataConsToBD(consData)
        );
      }

      //actualizar errores
      dispatch(changeRegisterErrorCons({ msg: "Sin errores", error: "" }));
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      dispatch(
        changeRegisterErrorCons({
          msg: "Hay errores",
          error: comprobarErrorCons(error.response.data.message),
        })
      );
    } finally {
      startLoadConsultas("no_filtros", "_", "_");
    }
  };

  const startDeletingConsulta = async () => {
    try {
      await deleteConsulta(pacienteActivo.id, consultaActiva.id_consulta);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      dispatch(onSetActivaConsulta(null));
      startLoadConsultas("no_filtros", "_", "_");
    }
  };
  return {
    //* Propiedades
    consultaActiva,
    consultasList,
    errorLoadConsultas,
    stateOpenFormCons,
    titleFormConsulta,
    errorMsgRegCons,
    stateOpenDelCons,
    //* Métodos
    changeDataConsulta,
    startLoadConsultas,
    changeStateFormCons,
    changeStateDelCons,
    changeTitleFormCons,
    startSavingConsulta,
    startDeletingConsulta,
  };
};

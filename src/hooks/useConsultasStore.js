import { useDispatch, useSelector } from "react-redux";
import { getConsultas } from "../api/consultas.api";
import { changeErrorLoadConsultas, onLoadConsultasList } from "../store";
import { extractMesAnio } from "../agenda/helpers/formatedDataCite";

//
//

export const useConsultasStore = () => {
  //

  const dispatch = useDispatch();

  const { consultaActiva, consultasList, errorLoadConsultas } = useSelector(
    (state) => state.consultas
  );
  const { pacienteActivo } = useSelector((state) => state.pacientes);

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

      console.log(data);
      //1er bucle
      //para crear los elementos objetos del array, cuya unica llave es el nombre del mes + el año,
      // se usa un array para controlar que no se repitan los meses
      data.forEach((consulta) => {
        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        if (!arrMesAnio.includes(nameMesAnio)) {
          arrMesAnio.push(nameMesAnio);
          arrayConsultasMonth.push({ [nameMesAnio]: [] });
        }
      });

      let iterator = 0;
      let mesTemporal = Object.keys(arrayConsultasMonth[0])[0];

      //2do bucle
      //
      data.forEach((consulta) => {
        const nameMesAnio = extractMesAnio(
          consulta.fecha_consulta.replaceAll("-", "/")
        );

        if (mesTemporal !== nameMesAnio) {
          iterator++;
          mesTemporal = nameMesAnio;
        }

        //formateo de los datos pendientes
        // formatedDataCite([consulta])[0]
        arrayConsultasMonth[iterator][`${nameMesAnio}`].push(consulta);
      });
      dispatch(onLoadConsultasList(arrayConsultasMonth));
      dispatch(changeErrorLoadConsultas(null));

      //
    } catch (error) {
      console.log("Error cargando lista de futuras citas");
      console.log(error.response.data.message);
      dispatch(changeErrorLoadConsultas(error.response.data.message));
    }
  };

  return {
    //* Propiedades
    consultaActiva,
    consultasList,
    errorLoadConsultas,

    //* Métodos
    startLoadConsultas,
  };
};

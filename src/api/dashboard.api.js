import dentalSmileApi from "./dentalSmileApi";

export const getPanelData = async (panel, tipo, param_fechaIni, fechaFin) =>
  await dentalSmileApi.get(
    `/administracion/panel/${panel}/${tipo}/${param_fechaIni}/${fechaFin}`
  );

export const getGananciasData = async (
  tipGan,
  tipo,
  param_fechaIni,
  fechaFin
) =>
  await dentalSmileApi.get(
    `/administracion/ganancias/${tipGan}/${tipo}/${param_fechaIni}/${fechaFin}`
  );

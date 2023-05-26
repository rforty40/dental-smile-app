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

export const getTipoDePago = async (tipPago, id) =>
  await dentalSmileApi.get(`/administracion/tiposPago/${tipPago}/${id}`);

export const createTipoPago = async (pago) =>
  await dentalSmileApi.post("/administracion/tiposPago/create", pago);

export const updateTipoPago = async (id_tpago, pago) =>
  await dentalSmileApi.put(
    `/administracion/tiposPago/update/${id_tpago}`,
    pago
  );

export const deleteTipoPago = async (id_tpago) =>
  await dentalSmileApi.delete(`/administracion/tiposPago/delete/${id_tpago}`);

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

//tipo de pagos
export const getTipoDePago = async (tipPago) =>
  await dentalSmileApi.get(`/administracion/tiposPago/${tipPago}/_`);

export const createTipoPago = async (pago) =>
  await dentalSmileApi.post("/administracion/tiposPago/create", pago);

export const updateTipoPago = async (id_tpago, pago) =>
  await dentalSmileApi.put(
    `/administracion/tiposPago/update/${id_tpago}`,
    pago
  );
export const deleteTipoPago = async (id_tpago) =>
  await dentalSmileApi.delete(`/administracion/tiposPago/delete/${id_tpago}`);

//tipos de consulta
export const getTipoDeCons = async () =>
  await dentalSmileApi.get(`/administracion/tiposConsulta/todos/_`);

export const createTipoCons = async (tipCons) =>
  await dentalSmileApi.post("/administracion/tiposConsulta/create", tipCons);

export const updateTipoCons = async (id_tcons, tipCons) =>
  await dentalSmileApi.put(
    `/administracion/tiposConsulta/update/${id_tcons}`,
    tipCons
  );
export const deleteTipoCons = async (id_tcons) =>
  await dentalSmileApi.delete(
    `/administracion/tiposConsulta/delete/${id_tcons}`
  );

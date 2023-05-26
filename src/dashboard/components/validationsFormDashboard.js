export const formValidationsTipPago = {
  tipo_de_pago: [(value) => value.length > 0, "Campo requerido"],
  precio: [(value) => value.length > 0, "Campo requerido"],
};

export const formValidationsTipCons = {
  tipo_de_consulta: [(value) => value.length > 0, "Campo requerido"],
  precio: [(value) => value.length > 0, "Campo requerido"],
};

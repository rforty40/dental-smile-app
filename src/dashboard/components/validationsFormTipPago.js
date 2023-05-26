export const formValidations = {
  tipo_de_pago: [(value) => value.length > 0, "Campo requerido"],
  precio: [(value) => value.length > 0, "Campo requerido"],
};

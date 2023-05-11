const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const formValidations = {
  cedula: [
    (value) => value.length === 10,
    "Campo requerido. Debe tener 10 dígitos",
  ],

  edad: [(value) => value.toString().length > 0, "Campo requerido"],

  erNombre: [(value) => value.length > 0, "Campo requerido"],
  // doNombre: [(value) => true, "Opcional"],
  erApellido: [(value) => value.length > 0, "Campo requerido"],
  // doApellido: [(value) => true, "Opcional"],
  // telefono: [(value) => true, "Opcional"],
  telefono: [
    (value) => value.length === 10 || value.length === 0,
    "Opcional. El número debe tener 10 dígitos",
  ],
  email: [
    (value) => value.match(mailformat) || value.length === 0,
    "Opcional. Escriba un correo válido",
  ],
  // nomRes: [(value) => true, "Opcional"],
  // parRes: [(value) => true, "Opcional"],
  // telRes: [(value) => true, "Opcional"],
};

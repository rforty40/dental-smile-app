import { useState, useEffect } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Portal,
  TextField,
  Typography,
} from "@mui/material";

import {
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  NoteAddOutlined,
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";

import {
  ButtonCustom,
  CustomAlert,
  CustomAutocomplete,
  IconTextField,
  RadioGroupCustom,
} from "../../ui";
import { FaNotesMedical } from "react-icons/fa";
import { useDiagnosticosStore, useExamenesStore } from "../../hooks";
import { TxtFieFormTratam } from "./TxtFieFormTratam";

//
//
//

export const FormModalTratam = ({ openModal, setOpenModal, title }) => {
  //store
  const { enfermedadesCieList, startLoadEnfermedadesCie } = useExamenesStore();

  const {
    diagnosticosList,
    diagActivo,
    errorMsgRegCons,
    startSavingDiagnostico,
  } = useDiagnosticosStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);
  //hook txt btn
  const [txtButton, setTxtButton] = useState("");

  //hook tipo de diagnostico
  const [stateRadioDiag, setStateRadioDiag] = useState("");

  //hook enfermedad
  const [stateCodigoCie, setStateCodigoCie] = useState(null);

  //hook descripcion
  const [stateDescripcion, setStateDescripcion] = useState("");

  //cerrarModal
  const cerrarModal = () => {
    setOpenModal(false);
  };
  //control alert
  const [msgAlert, setMsgAlert] = useState("");
  const [stateSnackbar, setStateSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setStateSnackbar(false);
  };
  const handleOpenSnackbar = () => {
    setStateSnackbar(true);
  };

  //control alert error
  const [stateSnackbarError, setStateSnackbarError] = useState(false);
  const handleCloseSnackbarError = () => {
    setStateSnackbarError(false);
  };
  const handleOpenSnackbarError = () => {
    setStateSnackbarError(true);
  };

  //limpiar los componentes del formulario
  const resetInputText = () => {
    setStateRadioDiag("");
    setStateCodigoCie(null);
    setStateDescripcion("");
  };

  //control formulario de registro y edición
  useEffect(() => {
    console.log(diagActivo);
    if (diagActivo) {
      //cargar los componentes
      const enfermedadCie = enfermedadesCieList.find(
        (enferCie) => enferCie.id === diagActivo.codigoCIE
      );

      setStateCodigoCie(enfermedadCie === undefined ? null : enfermedadCie);
      setStateRadioDiag(diagActivo.presuntivo_definitivo);
      setStateDescripcion(diagActivo.descripcion);
    } else {
      console.log("esta en registro");
      resetInputText();
    }
  }, [diagActivo]);

  useEffect(() => {
    if (title.includes("Editar")) {
      setTxtButton("Actualizar");
      setMsgAlert(`Se actualizaron los datos del diagnóstico 🙂.`);
      //
      // }
    } else {
      setTxtButton("Registrar");
      setMsgAlert(`Se registro un nuevo diagnóstico 🙂.`);
    }
  }, [title]);

  useEffect(() => {
    // startLoadEnfermedadesCie();
  }, []);

  //

  // const [arrComplicaciones, setArrComplicaciones] = useState([]);
  const [arrComplicaciones, setArrComplicaciones] = useState([
    { id_compli: 1, txt_compli: "aaaaa" },
    { id_compli: 2, txt_compli: "bbbbbbbbb" },

    { id_compli: 3, txt_compli: "ccccccc" },

    { id_compli: 4, txt_compli: "dddddd" },
  ]);

  const addComplication = () => {
    setArrComplicaciones([
      ...arrComplicaciones,
      { id_compli: arrComplicaciones.length + 1, txt_compli: "" },
    ]);
  };

  const removeComplication = (comp_id) => {
    console.log("AAAA", comp_id);
    setArrComplicaciones(
      // (state) =>
      arrComplicaciones.filter((comp) => comp.id_compli !== comp_id)
    );
  };
  const updateComplication = (comp_id, txt) => {
    console.log(comp_id, txt);
    setArrComplicaciones((state) => {
      console.log(state);
      return state.map((comp) => {
        if (comp.id_compli === comp_id) {
          return { ...comp, txt_compli: txt };
        }
        return comp;
      });
    });
  };

  const [arrProcedimientos, setArrProcedimientos] = useState([]);

  const addProced = ({}) => {
    setArrProcedimientos([...arrProcedimientos, {}]);
  };
  console.log(arrComplicaciones);
  //funcion enviar los datos
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    // //validaciones
    // if (stateRadioDiag === "") return;

    // const codigoCIE = stateCodigoCie === null ? "" : stateCodigoCie.id;

    // //enviando al custom hook

    // startSavingDiagnostico({
    //   presuntivo_definitivo: stateRadioDiag,
    //   codigoCIE,
    //   descripcion: stateDescripcion.trim(),
    // });

    console.log(arrComplicaciones);
  };

  //manejador de errores todos los campos
  useEffect(() => {
    if (errorMsgRegCons.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);

      //cuando el registro es exitoso
      if (!title.includes("Editar")) {
        resetInputText();
      }
    }
    if (errorMsgRegCons.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegCons]);
  return (
    <>
      <Dialog
        maxWidth="md"
        open={openModal}
        onClose={cerrarModal}
        sx={{
          "& .MuiPaper-root": {
            width: "650px",
          },
        }}
      >
        <DialogTitle
          padding="16px 10px 16px  20px !important"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              fontStyle: "italic",
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            {title}
          </Typography>

          <IconButton onClick={cerrarModal}>
            <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form
            onSubmit={onSubmit}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid
              container
              sx={{
                display: "grid",
                paddingTop: "15px",
                alignItems: "start",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(5, max-content)",
                gridTemplateAreas: `
                 
                ". codigoCie codigoCie"
              
              "complicaciones complicaciones complicaciones"
              
              "procedimientos procedimientos procedimientos"
              
              "prescripciones prescripciones prescripciones"
              "btns btns btns"
              `,
                rowGap: "20px",
                columnGap: "20px",
              }}
            >
              <Grid item gridArea="codigoCie">
                <CustomAutocomplete
                  fullWidth
                  // disablePortal
                  options={diagnosticosList}
                  getOptionLabel={(option) =>
                    option.codigoCIE + " - " + option.enfermedad_diagnosticada
                  }
                  value={stateCodigoCie}
                  onChange={(event, newValue) => {
                    setStateCodigoCie(newValue);
                  }}
                  propsTextField={{
                    label: "Código CIE:",
                    placeholder: "Seleccione el código CIE de la enfermedad",
                  }}
                  autoFocus
                  iconAutocomplete={
                    <img
                      type="img/svg"
                      width="25px"
                      height="25px"
                      src={`/assets/icons/formExamen/enfermedadCie.svg`}
                    />
                  }
                  heightList="240px"
                />
              </Grid>

              <Grid
                item
                gridArea="complicaciones"
                display="flex"
                flexDirection="column"
              >
                <div>
                  <ButtonCustom
                    altura={"50px"}
                    colorf={"transparent"}
                    colorh={"transparent"}
                    colort={"primary.main"}
                    colorth={"primary.main"}
                    txt_b={"Complicaciones"}
                    flexDir="row"
                    txt_b_size="16px"
                    propsXS={{ boxShadow: "none !important" }}
                    iconB={<NoteAddOutlined />}
                    onClick={addComplication}
                  />
                </div>
                <Box display="flex" flexDirection="column" rowGap="8px">
                  {arrComplicaciones.map((comp) => {
                    console.log(comp);
                    return (
                      <TxtFieFormTratam
                        dataId={comp.id_compli}
                        dataTxt={comp.txt_compli}
                        // data={comp}
                        fnDelete={removeComplication}
                        fnUpdate={updateComplication}
                      />
                    );
                  })}
                </Box>
              </Grid>

              <Grid
                item
                gridArea="procedimientos"
                display="flex"
                flexDirection="column"
              >
                <Box alignSelf="end">
                  <ButtonCustom
                    altura={"50px"}
                    colorf={"transparent"}
                    colorh={"transparent"}
                    colort={"primary.main"}
                    colorth={"primary.main"}
                    txt_b={"Procedimientos"}
                    flexDir="row"
                    txt_b_size="16px"
                    propsXS={{ boxShadow: "none !important" }}
                    iconB={<FaNotesMedical />}
                    onClick={addProced}
                  />
                </Box>
                <Box display="flex" flexDirection="column" rowGap="8px">
                  {arrProcedimientos.map(() => (
                    // <TxtFieFormTratam />
                    <p></p>
                  ))}
                </Box>
              </Grid>

              <Grid
                item
                gridArea="prescripciones"
                display="flex"
                flexDirection="column"
              >
                <ButtonCustom
                  altura={"50px"}
                  colorf={"transparent"}
                  colorh={"transparent"}
                  colort={"primary.main"}
                  colorth={"primary.main"}
                  txt_b={"Prescripciones"}
                  flexDir="row"
                  txt_b_size="16px"
                  propsXS={{ boxShadow: "none !important" }}
                  iconB={
                    <img
                      type="img/svg"
                      width="22px"
                      height="22px"
                      src={`/assets/icons/formTratam/prescription.svg`}
                    />
                  }
                />
                <Box display="flex" flexDirection="column">
                  <p>prescripciones</p>
                  <p>prescripciones</p>
                  <p>prescripciones</p>
                </Box>
              </Grid>

              <Grid
                item
                gridArea="btns"
                display="flex"
                justifyContent="end"
                columnGap="10px"
              >
                <ButtonCustom
                  altura={"40px"}
                  colorf={"white"}
                  colorh={"btnHoverInForm.main"}
                  colort={"black"}
                  txt_b={"Cancelar"}
                  colorth={"white"}
                  propsXS={{ border: "1px solid black" }}
                  iconB={<CancelOutlined />}
                  onClick={cerrarModal}
                />

                <ButtonCustom
                  tipoBtn="submit"
                  altura="40px"
                  colorf="primary.main"
                  colorh="btnHoverInForm.main"
                  colort="white"
                  txt_b={txtButton}
                  iconB={<SaveOutlined />}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          title={"Completado"}
          message={msgAlert}
          colorbg="blueSecondary.main"
          colortxt="white"
          iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
        />

        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"Registro no completado"}
          message={errorMsgRegCons.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </>
  );
};

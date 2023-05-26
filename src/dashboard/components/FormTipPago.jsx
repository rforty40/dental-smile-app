import { forwardRef, useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import {
  Box,
  Icon,
  IconButton,
  Portal,
  Slide,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  CancelOutlined,
  CheckCircleOutline,
  CloseOutlined,
  Payments,
  SaveOutlined,
} from "@mui/icons-material";
import { ButtonCustom, CustomAlert, IconTextField } from "../../ui";

import { useForm, useTipPagoStore } from "../../hooks";

import { formValidations } from "./validationsFormTipPago";
import { useEffect } from "react";

//
//
//
//
//
//
const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

export const FormTipPago = ({
  openModalForm = false,
  setOpenModalForm,
  title,
}) => {
  //
  //customs hook store
  const { tipoPagoActivo, startSavingTipPago, errorMsgRegTipoPago } =
    useTipPagoStore();

  //hooks
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [msgAlert, setMsgAlert] = useState("");

  const [txtButton, setTxtButton] = useState("");

  const formDataPac = useMemo(() => {
    if (title.toUpperCase().includes("EDITAR")) {
      setMsgAlert(`Se actualizaron los datos del tipo de pago 🙂.`);
      setTxtButton("Actualizar");
      return {
        dataForm: {
          ...tipoPagoActivo,
        },
        formValidations,
      };
    } else {
      setMsgAlert(`Tipo de pago registrado con éxito 🙂.`);
      setTxtButton("Registrar");

      return {
        dataForm: {
          tipo_de_pago: "",
          precio: "",
        },
        formValidations,
      };
    }
  }, [title, tipoPagoActivo]);

  //custom hook form
  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidations
  );

  const cerrarModal = () => {
    setOpenModalForm(false);
  };

  //control alert
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

  //control envio del formulario
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    // console.log(formState);
    startSavingTipPago(formState);
  };

  //efecto secundario para comprobar errores en el registro y actualizacion
  useEffect(() => {
    if (errorMsgRegTipoPago.msg === "Sin errores" && formSubmitted) {
      cerrarModal();
      handleOpenSnackbar();
      setFormSubmitted(false);

      if (!title.toUpperCase().includes("EDITAR")) {
        formDataPac.dataForm = {
          tipo_de_pago: "",
          precio: "",
        };
      }
    }

    if (errorMsgRegTipoPago.msg === "Hay errores" && formSubmitted) {
      handleOpenSnackbarError();
      setFormSubmitted(false);
    }
  }, [errorMsgRegTipoPago]);

  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openModalForm}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle
          display="flex"
          padding="16px 10px 16px  20px !important"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          columnGap="50px"
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
            <Box
              display="flex"
              margin="10px 0px"
              flexDirection="column"
              rowGap="20px"
            >
              <IconTextField
                fullWidth
                label="Tipo de pago:"
                type="text"
                multiline
                name="tipo_de_pago"
                value={formState.tipo_de_pago}
                onChange={onInputChange}
                error={!!formValidation.tipo_de_pagoValid && formSubmitted}
                helperText={formValidation.tipo_de_pagoValid}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <Icon>
                    <Payments />
                  </Icon>
                }
              />
              <div style={{ display: "flex", justifyContent: "right" }}>
                <IconTextField
                  label="Precio:"
                  type="number"
                  prefix="$"
                  name="precio"
                  value={formState.precio}
                  onChange={onInputChange}
                  error={!!formValidation.precioValid && formSubmitted}
                  helperText={formValidation.precioValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <AttachMoney />
                    </Icon>
                  }
                  propsXS={{ width: "25%" }}
                />
              </div>

              <Box
                display="flex"
                flexDirection="row"
                paddingTop="10px"
                columnGap="15px"
                justifyContent="end"
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
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>

      <CustomAlert
        stateSnackbar={stateSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        title={"Completado"}
        message={msgAlert}
        colorbg="blueSecondary.main"
        colortxt="white"
        iconAlert={<CheckCircleOutline sx={{ color: "white" }} />}
      />
      <Portal>
        <CustomAlert
          stateSnackbar={stateSnackbarError}
          handleCloseSnackbar={handleCloseSnackbarError}
          title={"Registro no completado"}
          message={errorMsgRegTipoPago.error}
          colorbg="error.main"
          colortxt="white"
          iconAlert={<CancelOutlined sx={{ color: "white" }} />}
        />
      </Portal>
    </div>
  );
};

import { forwardRef, useEffect, useMemo, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FaChild, FaIdCard, FaUserEdit } from "react-icons/fa";
import { MdContactPhone, MdEmail, MdFamilyRestroom } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { AiTwotonePhone } from "react-icons/ai";

import { Grid, Icon, IconButton, Slide, Typography } from "@mui/material";
import {
  CancelOutlined,
  CloseOutlined,
  PhoneIphone,
  SaveOutlined,
} from "@mui/icons-material";
import { ButtonCustom, IconTextField, RadioGroupCustom } from "../../ui";

import { useDataStore, useForm, usePacienteStore } from "../../hooks";

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

import { formValidations } from "./validationsFormPac";

//
//
//
//

export const FormModalPac = () => {
  //

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { isFormPacOpen, changeModalFormReg, titleForm } = usePacienteStore();
  const { dataActiva } = useDataStore();

  const [menorEdad, setMenorEdad] = useState(true);

  const formDataPac = useMemo(() => {
    if (titleForm.toUpperCase().includes("EDITAR")) {
      setMenorEdad(false);

      return {
        dataForm: {
          cedula: dataActiva.cedula,
          edad: dataActiva.edad,
          sexo: dataActiva.sexo,
          erNombre: dataActiva.erNombre,
          doNombre: !dataActiva.doNombre ? "" : dataActiva.doNombre,
          erApellido: dataActiva.erApellido,
          doApellido: !dataActiva.doApellido ? "" : dataActiva.doApellido,
          telefono: !dataActiva.telefono ? "" : dataActiva.telefono,
          email: !dataActiva.email ? "" : dataActiva.email,
          nomRes: !dataActiva.nomRes ? "" : dataActiva.nomRes,
          parRes: !dataActiva.parRes ? "" : dataActiva.parRes,
          telRes: !dataActiva.telRes ? "" : dataActiva.telRes,
        },
        formValidations,
      };
    } else {
      setMenorEdad(true);
      return {
        dataForm: {
          cedula: "",
          edad: "",
          sexo: "",
          erNombre: "",
          doNombre: "",
          erApellido: "",
          doApellido: "",
          telefono: "",
          email: "",
          nomRes: "",
          parRes: "",
          telRes: "",
        },
        formValidations,
      };
    }
  }, [titleForm, dataActiva]);

  const { formState, formValidation, onInputChange, isFormValid } = useForm(
    formDataPac.dataForm,
    formDataPac.formValidations
  );

  const cerrarModal = () => {
    changeModalFormReg(false);
  };

  //control del RadioGroup

  const [hookRadio, setHookRadio] = useState("");
  useEffect(() => {
    setHookRadio(formDataPac.dataForm.sexo);
  }, [titleForm, dataActiva]);

  //control envio del formulario
  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    if (hookRadio === "") return;

    console.log("Envio mi data");
  };

  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        open={isFormPacOpen}
        onClose={cerrarModal}
        TransitionComponent={Transition}
        keepMounted
        // aria-describedby="alert-dialog-slide-description"
        sx={{
          backdropFilter: "blur(3px)",
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
            {titleForm}
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
                paddingTop: "5px",
                alignItems: "center",
                gridTemplateColumns: "repeat(10, 1fr)",
                gridTemplateRows: "repeat(5, max-content)",
                gridTemplateAreas: `"cedula cedula cedula edad edad sexo sexo sexo sexo sexo"
              "nombre1 nombre1 nombre1 nombre1 nombre1 apellido1 apellido1 apellido1 apellido1 apellido1 "
              "nombre2 nombre2 nombre2 nombre2 nombre2 apellido2 apellido2 apellido2 apellido2 apellido2"
              "telefono telefono telefono email email email email email email email "
              "responsable responsable responsable responsable responsable btnReg btnReg btnReg btnReg btnReg "
              
              `,
                rowGap: "15px",
                columnGap: "10px",
              }}
            >
              <Grid item gridArea="cedula">
                <IconTextField
                  autoFocus
                  fullWidth
                  label="No. Cédula:"
                  type="number"
                  placeholder="xxxxxxxxxx"
                  name="cedula"
                  value={formState.cedula}
                  onChange={onInputChange}
                  error={!!formValidation.cedulaValid && formSubmitted}
                  helperText={formValidation.cedulaValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <FaIdCard />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="edad">
                <IconTextField
                  fullWidth
                  label="Edad:"
                  type="number"
                  placeholder="xx"
                  name="edad"
                  value={formState.edad}
                  onChange={(event) => {
                    onInputChange(event);
                    if (event.target.value >= 18) {
                      setMenorEdad(true);
                    } else {
                      setMenorEdad(false);
                    }
                  }}
                  error={!!formValidation.edadValid && formSubmitted}
                  helperText={formValidation.edadValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon
                      sx={{
                        color: "primary.main",
                        fontSize: "25px",
                      }}
                    >
                      <FaChild />
                    </Icon>
                  }
                />
              </Grid>

              <Grid
                item
                gridArea="sexo"
                justifySelf="end"
                display="flex"
                flexDirection="column"
                paddingLeft="5px"
                boxShadow={
                  hookRadio === "" ? "1px 4px 4px rgba(0, 0, 0, 0.5)" : "none"
                }
              >
                {hookRadio === "" ? (
                  <p style={{ fontSize: "13px", color: "#116482" }}>
                    Opción requerida
                  </p>
                ) : (
                  ""
                )}
                <RadioGroupCustom
                  title="Sexo"
                  colorRadio="primary.main"
                  radioOptions={["Femenino", "Masculino"]}
                  hookRadio={hookRadio}
                  setHookRadio={setHookRadio}
                />
              </Grid>

              <Grid item gridArea="nombre1">
                <IconTextField
                  fullWidth
                  label={
                    <p>
                      1<span style={{ fontSize: "13px" }}>er. </span>Nombre:
                    </p>
                  }
                  type="text"
                  placeholder="xxxxxxxxxx"
                  name="erNombre"
                  value={formState.erNombre}
                  onChange={onInputChange}
                  error={!!formValidation.erNombreValid && formSubmitted}
                  helperText={formValidation.erNombreValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <FaUserEdit />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="nombre2">
                <IconTextField
                  fullWidth
                  label={
                    <p>
                      2<span style={{ fontSize: "13px" }}>do. </span>Nombre:
                    </p>
                  }
                  type="text"
                  placeholder="xxxxxxxxxx"
                  name="doNombre"
                  value={formState.doNombre}
                  onChange={onInputChange}
                  error={!!formValidation.doNombreValid && formSubmitted}
                  helperText={formValidation.doNombreValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <FaUserEdit />{" "}
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="apellido1">
                <IconTextField
                  fullWidth
                  label={
                    <p>
                      1<span style={{ fontSize: "13px" }}>er. </span>Apellido:
                    </p>
                  }
                  type="text"
                  placeholder="xxxxxxxxxx"
                  name="erApellido"
                  value={formState.erApellido}
                  onChange={onInputChange}
                  error={!!formValidation.erApellidoValid && formSubmitted}
                  helperText={formValidation.erApellidoValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <FaUserEdit />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="apellido2">
                <IconTextField
                  fullWidth
                  label={
                    <p>
                      2<span style={{ fontSize: "13px" }}>do. </span>Apellido:
                    </p>
                  }
                  type="text"
                  placeholder="xxxxxxxxxx"
                  name="doApellido"
                  value={formState.doApellido}
                  onChange={onInputChange}
                  error={!!formValidation.doApellidoValid && formSubmitted}
                  helperText={formValidation.doApellidoValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <FaUserEdit />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="telefono">
                <IconTextField
                  fullWidth
                  label="Teléfono:"
                  type="number"
                  placeholder="09xxxxxxxx"
                  name="telefono"
                  value={formState.telefono}
                  onChange={onInputChange}
                  error={!!formValidation.telefonoValid && formSubmitted}
                  helperText={formValidation.telefonoValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <PhoneIphone />
                    </Icon>
                  }
                />
              </Grid>

              <Grid item gridArea="email">
                <IconTextField
                  fullWidth
                  label="Email:"
                  type="email"
                  placeholder="xxxxxxx@xxx.xxx"
                  name="email"
                  value={formState.email}
                  onChange={onInputChange}
                  error={!!formValidation.emailValid && formSubmitted}
                  helperText={formValidation.emailValid}
                  colorIcon="primary.main"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <MdEmail />
                    </Icon>
                  }
                />
              </Grid>
              <Grid
                item
                gridArea="responsable"
                flexDirection="column"
                display="flex"
                rowGap="10px"
              >
                <IconTextField
                  fullWidth
                  disabled={menorEdad}
                  label="Nombre del familiar:"
                  type="text"
                  placeholder="xxxxx"
                  name="nomRes"
                  value={formState.nomRes}
                  onChange={onInputChange}
                  error={!!formValidation.nomResValid && formSubmitted}
                  helperText={formValidation.nomResValid}
                  colorIcon="black"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <MdFamilyRestroom />
                    </Icon>
                  }
                />
                <IconTextField
                  fullWidth
                  disabled={menorEdad}
                  label="Parentesco:"
                  type="text"
                  placeholder="xxxxx"
                  name="parRes"
                  value={formState.parRes}
                  onChange={onInputChange}
                  error={!!formValidation.parResValid && formSubmitted}
                  helperText={formValidation.parResValid}
                  colorIcon="black"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <IoIosContacts />
                    </Icon>
                  }
                />
                <IconTextField
                  fullWidth
                  disabled={menorEdad}
                  label="Teléfono:"
                  type="number"
                  placeholder="09xxxxxxxx"
                  name="telRes"
                  value={formState.telRes}
                  onChange={onInputChange}
                  error={!!formValidation.telResValid && formSubmitted}
                  helperText={formValidation.telResValid}
                  colorIcon="black"
                  colorHover="btnHoverInForm.main"
                  colorTxt="black"
                  colorLabel="primary.main"
                  iconEnd={
                    <Icon>
                      <MdContactPhone />
                    </Icon>
                  }
                />
              </Grid>

              <Grid
                item
                gridArea="btnReg"
                display="flex"
                flexDirection="row"
                columnGap="10px"
                rowGap="10px"
                margin="auto"
                marginBottom="0px"
                marginRight="0px"
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
                  altura={"40px"}
                  colorf={"primary.main"}
                  colorh={"btnHoverInForm.main"}
                  colort={"white"}
                  txt_b={"Registrar"}
                  iconB={<SaveOutlined />}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

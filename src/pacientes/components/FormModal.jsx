import { forwardRef, useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FaChild, FaIdCard, FaUserEdit } from "react-icons/fa";
import { MdContactPhone, MdEmail, MdFamilyRestroom } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { AiTwotonePhone } from "react-icons/ai";

import { Grid, Icon, IconButton, Slide } from "@mui/material";
import {
  CancelOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { ButtonCustom, IconTextField, RadioGroupCustom } from "../../ui";

import { usePacienteStore } from "../../hooks";

const Transition = forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="left" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

//
//
//
//

export default function FormModal({ title }) {
  //

  const { isFormPacOpen, closeModalFormReg } = usePacienteStore();

  const [menorEdad, setMenorEdad] = useState(true);
  //
  return (
    <div>
      <Dialog
        maxWidth="sm"
        open={isFormPacOpen}
        onClose={closeModalFormReg}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
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
          className="text-shadow"
          sx={{
            fontWeight: "bold",
            fontSize: "28px",
            fontStyle: "italic",
          }}
        >
          {title}
          <IconButton onClick={closeModalFormReg}>
            <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
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
              rowGap: "18px",
              columnGap: "10px",
            }}
          >
            <Grid item gridArea="cedula">
              <IconTextField
                autoFocus
                label="No. Cédula:"
                type="number"
                placeholder="xxxxxxxxxx"
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
                onChange={(event) => {
                  if (event.target.value >= 18) {
                    setMenorEdad(true);
                  } else {
                    setMenorEdad(false);
                  }
                }}
                label="Edad:"
                type="number"
                placeholder="xx"
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
            >
              <RadioGroupCustom
                title="Sexo"
                colorRadio="primary.main"
                radioOptions={["Femenino", "Masculino"]}
              />
            </Grid>

            <Grid item gridArea="nombre1">
              <IconTextField
                label={
                  <p>
                    1<span style={{ fontSize: "13px" }}>er. </span>Nombre:
                  </p>
                }
                propsXS={{
                  width: { sm: 271, md: 271 },
                }}
                type="text"
                placeholder="xxxxxxxxxx"
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
                propsXS={{
                  width: { sm: 271, md: 271 },
                }}
                label={
                  <p>
                    2<span style={{ fontSize: "13px" }}>do. </span>Nombre:
                  </p>
                }
                type="text"
                placeholder="xxxxxxxxxx"
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
                propsXS={{
                  width: { sm: 271, md: 271 },
                }}
                label={
                  <p>
                    1<span style={{ fontSize: "13px" }}>er. </span>Apellido:
                  </p>
                }
                type="text"
                placeholder="xxxxxxxxxx"
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
                propsXS={{
                  width: { sm: 271, md: 271 },
                }}
                label={
                  <p>
                    2<span style={{ fontSize: "13px" }}>do. </span>Apellido:
                  </p>
                }
                type="text"
                placeholder="xxxxxxxxxx"
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
                label="Teléfono:"
                type="number"
                placeholder="09xxxxxxxx"
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <Icon>
                    <AiTwotonePhone />
                  </Icon>
                }
              />
            </Grid>

            <Grid item gridArea="email">
              <IconTextField
                propsXS={{
                  width: { sm: 383, md: 383 },
                }}
                label="Email:"
                type="email"
                placeholder="xxxxxxx@xxx.xxx"
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
                disabled={menorEdad}
                label="Nombre del familiar:"
                type="text"
                placeholder="xxxxx"
                colorIcon="black"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="black"
                iconEnd={
                  <Icon>
                    <MdFamilyRestroom />
                  </Icon>
                }
              />
              <IconTextField
                disabled={menorEdad}
                label="Parentesco:"
                type="text"
                placeholder="xxxxx"
                colorIcon="black"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="black"
                iconEnd={
                  <Icon>
                    <IoIosContacts />
                  </Icon>
                }
              />
              <IconTextField
                disabled={menorEdad}
                label="Teléfono:"
                type="number"
                placeholder="09xxxxxxxx"
                colorIcon="black"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="black"
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
                onClick={closeModalFormReg}
              />
              <ButtonCustom
                altura={"40px"}
                colorf={"primary.main"}
                colorh={"btnHoverInForm.main"}
                colort={"white"}
                txt_b={"Registrar"}
                iconB={<SaveOutlined />}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

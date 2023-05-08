import { forwardRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { FaIdCard, FaUserEdit } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import { AiTwotonePhone } from "react-icons/ai";
import {
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  Typography,
} from "@mui/material";
import {
  CancelOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { ButtonCustom, IconTextField } from "../../ui";

import { usePacienteStore } from "../../hooks";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function FormModal() {
  const { isFormPacOpen, closeModalFormReg } = usePacienteStore();
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
          backdropFilter: "blur(2px)",
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
          Registro de Paciente
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <FaIdCard />
                  </Icon>
                }
              />
            </Grid>

            <Grid item gridArea="edad">
              <IconTextField
                label="Edad:"
                type="number"
                placeholder="xx"
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <GiAges />
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
              <p style={{ padding: "5px 0px 0px 0px", color: "#602a90" }}>
                Sexo:
              </p>
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Femenino
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        "&, &.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "14px",
                      }}
                    >
                      Masculino
                    </Typography>
                  }
                />
              </RadioGroup>
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <FaUserEdit />{" "}
                  </Icon>
                }
              />{" "}
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
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
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
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
                label="Familiar:"
                type="text"
                placeholder="xxxxx"
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <IoIosContacts />
                  </Icon>
                }
              />
              <IconTextField
                label="Parentesco:"
                type="text"
                placeholder="xxxxx"
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <IoIosContacts />
                  </Icon>
                }
              />
              <IconTextField
                label="Teléfono:"
                type="number"
                placeholder="09xxxxxxxx"
                iconEnd={
                  <Icon
                    sx={{
                      color: "primary.main",
                      fontSize: "25px",
                    }}
                  >
                    <IoIosContacts />
                  </Icon>
                }
              />
            </Grid>

            <Grid
              item
              gridArea="btnReg"
              display="flex"
              flexDirection="column"
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

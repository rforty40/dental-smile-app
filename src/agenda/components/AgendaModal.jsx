import {
  CancelOutlined,
  CloseOutlined,
  Description,
  PersonSearch,
  SaveOutlined,
  SegmentOutlined,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonCustom, IconTextField, SelectedCustom } from "../../ui";
import { FaIdCard, FaUser } from "react-icons/fa";
import { useAgendaStore, usePacienteStore } from "../../hooks";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
export const AgendaModal = ({ openModalAgenda, setOpenModalAgenda }) => {
  //
  //cerrarModal
  const cerrarModal = () => {
    setOpenModalAgenda(false);
  };

  //lista de pacientes traida de la store
  const { pacientesListBusq } = usePacienteStore();

  return (
    <Dialog maxWidth="sm" open={openModalAgenda} onClose={cerrarModal}>
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
          {/* {titleForm} */}
          Registrar/Actualizar cita
        </Typography>

        <IconButton onClick={cerrarModal}>
          <CloseOutlined style={{ fontSize: "25px", color: "#602a90" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form
          // onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid
            container
            sx={{
              display: "grid",
              paddingTop: "5px",
              alignItems: "center",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(4, max-content)",
              gridTemplateAreas: `"paciente paciente paciente"
              "fecha horaIni horaFin"
              "motivo motivo motivo"
              "btnReg btnReg btnReg "
              `,
              rowGap: "30px",
              columnGap: "10px",
            }}
          >
            <Grid item gridArea="paciente">
              <Autocomplete
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={pacientesListBusq}
                renderInput={(params) => (
                  <TextField
                    placeholder="Seleccione un paciente"
                    {...params}
                    label="Pacientes:"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment
                          sx={{ color: "primary.main" }}
                          position="start"
                        >
                          <PersonSearch />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                sx={{
                  boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
                  ":hover": {
                    boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                  },

                  "& .Mui-focused.MuiInputBase-root ": {
                    boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                  },
                  "& .MuiFormLabel-root": {
                    color: "primary.main",
                  },
                  "& .MuiFormLabel-root.Mui-focused": {
                    color: "btnHoverInForm.main",
                  },
                  "& .Mui-focused > .MuiInputAdornment-root > .MuiSvgIcon-root":
                    {
                      color: "btnHoverInForm.main",
                    },

                  "& .MuiInputBase-input ": {
                    color: "black",
                  },
                  "& .MuiFormHelperText-contained": {
                    color: "orange",
                  },

                  "& .Mui-error ~ p": {
                    color: "error.main",
                  },
                }}
                ListboxProps={{
                  style: {
                    maxHeight: "190px",
                  },
                }}
              />
            </Grid>
            <Grid item gridArea="fecha">
              <LocalizationProvider
                adapterLocale={es}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  label={"Fecha:"}
                  views={["month", "day"]}
                  sx={{
                    boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
                    ":hover": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },

                    "& .Mui-focused.MuiInputBase-root ": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },
                    "& .MuiFormLabel-root": {
                      color: "primary.main",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "btnHoverInForm.main",
                    },
                    "& .MuiInputAdornment-root > .MuiButtonBase-root": {
                      color: "primary.main",
                    },

                    "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root":
                      {
                        color: "btnHoverInForm.main",
                      },

                    "& .MuiInputBase-input ": {
                      color: "black",
                    },
                    "& .MuiFormHelperText-contained": {
                      color: "orange",
                    },

                    "& .Mui-error ~ p": {
                      color: "error.main",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item gridArea="horaIni">
              <LocalizationProvider
                adapterLocale={es}
                dateAdapter={AdapterDateFns}
              >
                <TimePicker
                  ampm={false}
                  label={"Hora Inicio:"}
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                  sx={{
                    boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
                    ":hover": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },

                    "& .Mui-focused.MuiInputBase-root ": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },
                    "& .MuiFormLabel-root": {
                      color: "primary.main",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "btnHoverInForm.main",
                    },
                    "& .MuiInputAdornment-root > .MuiButtonBase-root": {
                      color: "primary.main",
                    },

                    "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root":
                      {
                        color: "btnHoverInForm.main",
                      },

                    "& .MuiInputBase-input ": {
                      color: "black",
                    },
                    "& .MuiFormHelperText-contained": {
                      color: "orange",
                    },

                    "& .Mui-error ~ p": {
                      color: "error.main",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item gridArea="horaFin">
              <LocalizationProvider
                adapterLocale={es}
                dateAdapter={AdapterDateFns}
              >
                <TimePicker
                  ampm={false}
                  label={"Hora Fin:"}
                  // value={value}
                  // onChange={(newValue) => setValue(newValue)}
                  sx={{
                    boxShadow: "1px 1.5px 1.5px rgba(0, 0, 0, 0.5)",
                    ":hover": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },

                    "& .Mui-focused.MuiInputBase-root ": {
                      boxShadow: "3px 5px 5px rgba(0, 0, 0, 0.5)",
                    },
                    "& .MuiFormLabel-root": {
                      color: "primary.main",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "btnHoverInForm.main",
                    },
                    "& .MuiInputAdornment-root > .MuiButtonBase-root": {
                      color: "primary.main",
                    },

                    "& .Mui-focused > .MuiInputAdornment-root > .MuiButtonBase-root":
                      {
                        color: "btnHoverInForm.main",
                      },

                    "& .MuiInputBase-input ": {
                      color: "black",
                    },
                    "& .MuiFormHelperText-contained": {
                      color: "orange",
                    },

                    "& .Mui-error ~ p": {
                      color: "error.main",
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item gridArea="motivo">
              <IconTextField
                autoFocus
                fullWidth
                label="Motivo de consulta:"
                type="text"
                multiline
                name="txt"
                // value={formState.cedula}
                // onChange={onInputChange}
                // error={!!formValidation.cedulaValid && formSubmitted}
                // helperText={formValidation.cedulaValid}
                colorIcon="primary.main"
                colorHover="btnHoverInForm.main"
                colorTxt="black"
                colorLabel="primary.main"
                iconEnd={
                  <Icon>
                    <SegmentOutlined />
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
              justifyContent="center"
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
                txt_b="Registrar"
                // {txtButton}
                iconB={<SaveOutlined />}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

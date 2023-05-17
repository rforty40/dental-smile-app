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
import {
  ButtonCustom,
  CustomAutocomplete,
  IconTextField,
  SelectedCustom,
} from "../../ui";
import { FaIdCard, FaUser } from "react-icons/fa";
import { useAgendaStore, useForm, usePacienteStore } from "../../hooks";

import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { useMemo, useState } from "react";
import { formValidations } from "./validationCita";
import { useEffect } from "react";
import { parseISO } from "date-fns";
import { retornarFecha } from "../helpers/formatedDataCite";

//
//
//

export const AgendaModal = ({ openModalAgenda, setOpenModalAgenda }) => {
  //

  //cerrarModal
  const cerrarModal = () => {
    setOpenModalAgenda(false);
  };

  //lista de pacientes traida de la store
  const { pacientesListBusq } = usePacienteStore();

  //citaActiva
  const { activeCita } = useAgendaStore();

  //hook del formulario
  const [formSubmitted, setFormSubmitted] = useState(false);

  //hook pacientes list
  const [statePacList, setStatePacList] = useState(0);

  //hook date picker
  const [stateDatePicker, setStateDatePicker] = useState(new Date());

  //hook time picker inicio
  const [stateTimeIni, setStateTimeIni] = useState(new Date());

  //hook time picker fin
  const [stateTimeFin, setStateTimeFin] = useState(new Date());

  //extraer fecha, horaI, fechaF del activeCita
  useEffect(() => {
    if (activeCita !== null) {
      setStateDatePicker(activeCita.start);

      setStateTimeIni(activeCita.start);
      setStateTimeFin(activeCita.end);
    }
  }, [activeCita]);

  //handler del cambio en la fecha
  const onChangeDatePicker = (newValue) => {
    setStateDatePicker(newValue);
    setStateTimeIni((state) => retornarFecha(state, newValue));
    setStateTimeFin((state) => retornarFecha(state, newValue));
  };

  //
  //hook errores en las fechas
  const [errorDate, setErrorDate] = useState(null);
  const [errorHourInit, setErrorHourInit] = useState(null);
  const [errorHourFin, setErrorHourFin] = useState(null);

  const errorMsgDate = useMemo(() => {
    switch (errorDate) {
      case "maxDate": {
        return "Fecha muy lejana";
      }
      case "invalidDate": {
        return "Fecha inválida";
      }
      case "disablePast": {
        return "Esta fecha ya pasó";
      }
      default: {
        return "";
      }
    }
  }, [errorDate]);

  const errorMsgHourInit = useMemo(() => {
    if (errorHourInit === "disablePast" && errorDate === null)
      return "Esta hora ya pasó";
    else {
      return "";
    }
  }, [errorHourInit, errorDate]);

  const errorMsgHourFin = useMemo(() => {
    if (errorHourFin === "minTime") {
      return "La hora de fin mínima solo puede ser 5 minutos despues de la hora de inicio";
    } else {
      return "";
    }
  }, [errorHourFin]);

  //
  //hook inputTextField
  const [stateMotivo, setStateMotivo] = useState("");

  //custom hook useForm
  const formDataCita = useMemo(() => {
    return {
      dataForm: {
        /*
      Cuando(pin):"Junio"
      fecha_cita(pin):"2023/06/14"
      hora_inicio(pin):"08:30"
      hora_fin(pin):"10:30"
      id_paciente(pin):2
      Paciente(pin):"Marcos Antonio Lopes Palma"*/
        fecha_cita: "",
        hora_inicio: "",
        hora_fin: "",
        moti_citaAgen: "",
        id_paciente: "",
      },
    };
  }, []);

  //funcion enviar los datos
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (statePacList === 0) return;
    if (errorDate !== null) return;
    if (errorHourInit !== null) return;
    if (errorHourFin !== null) return;
    if (stateMotivo.length === 0) return;

    // formState.id_paciente = statePacList;

    console.log("Envio los datos");

    // console.log("statePacList", statePacList);
    // console.log("pilas ahi ", formState);

    //startSavingPaciente(formState);
  };

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
          onSubmit={onSubmit}
          className="animate__animated animate__fadeIn animate__faster"
        >
          <Grid
            container
            sx={{
              display: "grid",
              paddingTop: "15px",
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
              <CustomAutocomplete
                fullWidth
                disablePortal
                options={pacientesListBusq}
                onChange={(event, value) => {
                  value !== null
                    ? setStatePacList(value.id)
                    : setStatePacList(0);
                }}
                propsTextField={{
                  label: "Pacientes:",
                  placeholder: "Seleccione un paciente",
                  error: statePacList === 0 && formSubmitted,
                  helperText:
                    statePacList === 0
                      ? "Debe seleccionar un paciente de la lista"
                      : "",
                }}
                autoFocus
                iconAutocomplete={<PersonSearch />}
                heightList="190px"
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
                  disablePast
                  value={stateDatePicker}
                  onChange={onChangeDatePicker}
                  onError={(newError) => {
                    //  console.log("Error en la fecha", newError);
                    setErrorDate(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgDate,
                      error: errorMsgDate !== "" && formSubmitted,
                    },
                  }}
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
                      color: "btnHoverInForm.main",
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
                  disablePast
                  ampm={false}
                  label={"Hora Inicio:"}
                  value={stateTimeIni}
                  onChange={(newValue) => {
                    setStateTimeIni(newValue);
                    // console.log(newValue);
                  }}
                  onError={(newError) => {
                    // console.log("newError fechainit", newError);
                    setErrorHourInit(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgHourInit,
                      error: errorMsgHourInit !== "" && formSubmitted,
                    },
                  }}
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
                      color: "btnHoverInForm.main",
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
                  // disablePast

                  minTime={new Date(5 * 60000 + stateTimeIni.getTime())}
                  ampm={false}
                  label={"Hora Fin:"}
                  value={stateTimeFin}
                  onChange={(newValue) => {
                    // console.log(newValue);
                    setStateTimeFin(newValue);
                  }}
                  onError={(newError) => {
                    // console.log("newError fechainit", newError);
                    setErrorHourFin(newError);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMsgHourFin,
                      error: errorMsgHourFin !== "" && formSubmitted,
                    },
                  }}
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
                      color: "btnHoverInForm.main",
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
                fullWidth
                label="Motivo de consulta:"
                type="text"
                multiline
                name="moti_citaAgen"
                value={stateMotivo}
                onChange={({ target }) => {
                  setStateMotivo(target.value);
                }}
                error={stateMotivo.length === 0 && formSubmitted}
                helperText={
                  stateMotivo.length === 0
                    ? "Debe agregar un motivo de la cita"
                    : ""
                }
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

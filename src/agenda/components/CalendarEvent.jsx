import {
  AccessTime,
  CalendarMonthOutlined,
  CancelOutlined,
  DateRange,
  Event,
  PersonSearch,
  SaveOutlined,
  SegmentOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ClickAwayListener,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  tooltipClasses,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { ButtonCustom, IconTextField } from "../../ui";
import { AgendaModal } from "./AgendaModal";
import { useState } from "react";
import { useAgendaStore } from "../../hooks";

const StyledTooltip = styled((props) => (
  <Tooltip classes={{ popper: props.className }} {...props} />
))`
  & .MuiTooltip-tooltipArrow {
    background-color: transparent;
    margin:0px;
    padding:0px;
    color: black;

  }

  & .MuiTooltip-arrow {
    ::before {
      background-color: white;
      border: 3px solid #116482;
    },
   
  }
`;

const TitleCustom = () => {
  return (
    <Box
      display="flex"
      sx={{
        width: 600,
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "5px",
        border: "3px solid #116482",
      }}
    >
      <Grid
        container
        sx={{
          display: "grid",
          paddingTop: "5px",
          alignItems: "center",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, max-content)",
          gridTemplateAreas: `"titulo fecha paciente paciente"
              "horaIni horaFin . ."
              "motivo motivo btnReg btnReg"`,
          rowGap: "30px",
          columnGap: "10px",
        }}
      >
        <Grid item gridArea="titulo">
          <Typography fontSize="16px" fontStyle="italic" fontWeight="bold">
            Cita agendada
          </Typography>
        </Grid>
        <Grid item gridArea="paciente">
          <IconTextField
            autoFocus
            fullWidth
            label="Paciente:"
            type="text"
            defaultValue="Hello World"
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <PersonSearch />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="fecha">
          <IconTextField
            autoFocus
            fullWidth
            label="Fecha:"
            type="text"
            defaultValue="Hello World"
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <Event />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaIni">
          <IconTextField
            autoFocus
            fullWidth
            label="Hora Inicio:"
            type="text"
            defaultValue="Hello World"
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="horaFin">
          <IconTextField
            autoFocus
            fullWidth
            label="Hora Fin:"
            type="text"
            defaultValue="Hello World"
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            InputProps={{ readOnly: true }}
            iconEnd={
              <Icon>
                <AccessTime />
              </Icon>
            }
          />
        </Grid>
        <Grid item gridArea="motivo">
          <IconTextField
            autoFocus
            fullWidth
            label="Motivo de consulta:"
            type="text"
            colorIcon="primary.main"
            colorHover="btnHoverInForm.main"
            colorTxt="black"
            colorLabel="primary.main"
            InputProps={{ readOnly: true }}
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
            // onClick={cerrarModal}
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
    </Box>
  );
};

export const CalendarEvent = ({ event }) => {
  //

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(!open);
  };

  const {
    Cuando,
    fecha_cita,
    hora_inicio,
    hora_fin,
    Paciente,
    moti_citaAgen,
    esta_citaAgen,
  } = event;

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <StyledTooltip
          title={<TitleCustom />}
          arrow
          placement="right"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Zoom}
        >
          <Box
            component="div"
            onClick={handleTooltipOpen}
            display="flex"
            flexDirection="row"
            columnGap="40px"
            padding="5px"
            height="100%"
            sx={{
              borderRadius: "5px",
            }}
          >
            <Typography fontStyle="italic" color="white" fontWeight="bold">
              {moti_citaAgen}
            </Typography>
          </Box>
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};

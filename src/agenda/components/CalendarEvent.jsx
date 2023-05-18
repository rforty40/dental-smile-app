import { useState } from "react";
import {
  Box,
  ClickAwayListener,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { useAgendaStore } from "../../hooks";
import { ViewCita } from "./ViewCita";

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
      background-color:  black;
    
    },
   
  }
`;

//
//
//
//
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
      <div onClick={handleTooltipOpen}>
        <StyledTooltip
          title={<ViewCita closeCitaView={handleTooltipClose} />}
          arrow
          // placement="right"
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          TransitionComponent={Zoom}
        >
          <Box
            // component="div"

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

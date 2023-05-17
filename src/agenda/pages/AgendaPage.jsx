import { Box, Typography } from "@mui/material";

import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "./react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import { AgendaModal, CalendarEvent } from "../components/";
import { useAgendaStore, usePacienteStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Topbar } from "../../ui";
import { differenceInSeconds } from "date-fns";

const DnDCalendar = withDragAndDrop(Calendar);

//
//

export const AgendaPage = () => {
  //store
  const { changePage } = useUiStore();

  const { startLoadPacientes, pacientesListBusq } = usePacienteStore();

  const { startLoadCites, citas, changeDataCite } = useAgendaStore();

  //
  //estados locales
  const [openModalAgenda, setOpenModalAgenda] = useState(false);

  const handleOpenModalAgenda = () => {
    setOpenModalAgenda(true);
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  useEffect(() => {
    changePage();
    startLoadCites();
    startLoadPacientes();
  }, []);

  const today = new Date();

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor:
        event.esta_citaAgen === "Pendiente" ? "#116482" : "#d32f2f",
    };

    return {
      style,
    };
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    // handleOpenModalAgenda();
  };

  //funcion se activa al seleccionar uno o varios slots
  const clickSlot = (slotInfo) => {
    //
    const { start, end } = slotInfo;
    console.log(slotInfo);

    changeDataCite({
      start,
      end,
    });

    handleOpenModalAgenda();
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  const onEventDropResizable = async (data) => {
    const { start, end } = data;

    const difference = differenceInSeconds(end, start);

    const eventoActivo = activeEvent.event;

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }

    await startSavingEvent({ ...eventoActivo, start, end });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: " url(../../../public/assets/img/calendar_fondo.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        objectPosition: "center",
      }}
    >
      <Topbar />
      <Box
        margin="0px 20px 20px 20px"
        display="flex"
        justifyContent="end"
        className="box-shadow animate__animated animate__fadeIn"
      >
        <DnDCalendar
          className="animate__animated animate__fadeIn"
          selectable
          culture="es"
          localizer={localizer}
          events={citas}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{
            width: "100%",
            height: "calc( 100vh - 100px )",
            backgroundColor: "transparent",
            padding: "20px",
            borderRadius: "10px",
          }}
          messages={getMessagesES()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent,
          }}
          timeslots={4} // number of per section
          step={15} // number of minutes per timeslot
          min={
            // start time 7:00am
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
          }
          // end time 7:00pm
          max={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)
          }
          // onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
          onDragStart={onSelect}
          onEventDrop={onEventDropResizable}
          resizable
          onEventResize={onEventDropResizable}
          onSelectSlot={clickSlot}
          resizableAccessor={() => lastView !== "month"}
          tooltipAccessor={null}
          dayLayoutAlgorithm={"no-overlap"}
        />

        <AgendaModal
          openModalAgenda={openModalAgenda}
          setOpenModalAgenda={setOpenModalAgenda}
        />
      </Box>
    </div>
  );
};

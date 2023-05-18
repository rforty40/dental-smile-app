import { Box } from "@mui/material";

import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "./react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import { AgendaModal, CalendarEvent } from "../components/";
import { useAgendaStore, usePacienteStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";

import { Topbar } from "../../ui";

const DnDCalendar = withDragAndDrop(Calendar);

//
//

export const AgendaPage = () => {
  //store
  const { changePage } = useUiStore();

  const { startLoadPacientes } = usePacienteStore();

  const {
    citasList,
    changeStateFormAgenda,
    changeTitleFormAgenda,
    startLoadCites,
    startUpdatingCita,
    changeDataCite,
  } = useAgendaStore();

  //

  const handleOpenModalAgenda = () => {
    changeTitleFormAgenda("Agendar cita odontológica");
    changeStateFormAgenda(true);
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  useEffect(() => {
    changePage();
    // startLoadCites();
    startLoadPacientes();
  }, []);

  //cada actualizacion se vuelven a renderizar el startLoadCites()
  startLoadCites();

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

  //eventos del calendario
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  const onSelect = (event) => {
    console.log("onSelect");

    changeDataCite(event);
  };

  const onSelectDrag = ({ event }) => {
    console.log("onSelectedDrag");
    changeDataCite(event);
  };

  //funcion se activa al seleccionar uno o varios slots
  const clickSlot = (slotInfo) => {
    //
    console.log("clickSlot");

    const { start, end } = slotInfo;

    changeDataCite({
      start,
      end,
    });

    handleOpenModalAgenda();
  };

  const onEventDropResizable = (data) => {
    console.log("onEventDropResizable");
    const { start, end, event } = data;

    startUpdatingCita(event.fecha_cita, event.hora_inicio, {
      statePacList: event.id_paciente,
      stateDatePicker: start,
      stateTimeIni: start,
      stateTimeFin: end,
      stateMotivo: event.moti_citaAgen,
    });
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
          events={citasList}
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
          timeslots={1} // number of per section
          step={30} // number of minutes per timeslot
          min={
            // start time 7:00am
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
          }
          // end time 8:00pm
          max={
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)
          }
          onSelectEvent={onSelect}
          onView={onViewChanged}
          onDragStart={onSelectDrag}
          onEventDrop={onEventDropResizable}
          resizable
          onEventResize={onEventDropResizable}
          onSelectSlot={clickSlot}
          resizableAccessor={() => lastView !== "month"}
          tooltipAccessor={null}
          dayLayoutAlgorithm={"no-overlap"}
        />

        <AgendaModal />
      </Box>
    </div>
  );
};

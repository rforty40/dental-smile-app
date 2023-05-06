import { Box } from "@mui/material";

import { Calendar } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import "./react-big-calendar.css";
import { getMessagesES, localizer } from "../../helpers";
import { CalendarEvent } from "../components/";
import { useUiStore } from "../../hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const DnDCalendar = withDragAndDrop(Calendar);

//
//

export const AgendaPage = () => {
  console.log("CalendarPapge");

  const today = new Date();
  const events = [];
  const eventStyleGetter = (event, start, end, isSelected) => {
    // const isMyEvent =
    //   user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      // backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };
  return (
    <Box
      m="20px"
      display="flex"
      justifyContent="end"
      className="box-shadow animate__animated animate__fadeIn"
    >
      <DnDCalendar
        className="animate__animated animate__fadeIn"
        // popup
        selectable
        culture="es"
        localizer={localizer}
        events={events}
        // defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{
          width: "100%",
          height: "calc( 100vh - 150px )",
          backgroundColor: "white",
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
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7)
        }
        // end time 5:00pm
        max={
          new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)
        }
        // onDoubleClickEvent={onDoubleClick}
        // onSelectEvent={onSelect}
        // onView={onViewChanged}
        // onDragStart={onSelect}
        // onEventDrop={onEventDropResizable}
        // resizable
        // onEventResize={onEventDropResizable}
        // onSelectSlot={clickSlot}
        // start time 8:00am

        // resizableAccessor={() => lastView !== "month"}
      />
    </Box>
  );
};

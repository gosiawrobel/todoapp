import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function Calendar({selectedId, tasks}) {
  return (
    <FullCalendar plugins={[ dayGridPlugin]} initialView="dayGridMonth" events={tasks} />
  )


}

export default Calendar
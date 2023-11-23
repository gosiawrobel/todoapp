import { React, useEffect, useState, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { updateTask } from '../utils/taskUtils';
import {COLORS} from '../utils/colors.js'
import TaskDetails from './TaskDetails';


function CalendarView({ setTasks, tasks, darkMode}) {
  const [isSmall, setIsSmall]=useState(window.screen.width < 600 ? true : false)
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState()

  const handleResize = () => {
    const newIsSmall = window.screen.width < 600 ? true : false
    if (newIsSmall != isSmall){
      setIsSmall(newIsSmall)
    }
   
  }
  useEffect(()=> {
    window.addEventListener('resize', handleResize)
    return (()=> {
      window.removeEventListener('resize',handleResize)})
  },[isSmall])

  
  const handleEventDrop=(drop) => {
    const taskToUpdate = tasks.find((task)=> task.id == drop.event.id) 
    taskToUpdate.dueDate = drop.event.startStr;
    updateTask(setTasks, taskToUpdate)
  }
  
  const openPopup=(taskId)=>{
    setSelectedTaskId(taskId)
    setPopupOpen(true)
  }
  
  const closePopup=() => {
    setPopupOpen(false)
  }

  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    status: task.status,
    date: new Date(task.dueDate)
  }))
  
  return (
      <div className='calendar-box'>
      <TaskDetails open={popupOpen} onClose={closePopup} tasks={tasks} setTasks={setTasks} selectedTaskId={selectedTaskId}/>
      <FullCalendar  
      plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]} 
      initialView={window.innerWidth < 760 ? 'list' : 'dayGridMonth'} 
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridDay,list'
      }} 
          eventDrop={handleEventDrop}
          droppable={true}
          slotLabelFormat={{hour: 'numeric', minute: '2-digit', hour12: false}}
          scrollTime="6:00"
          editable={false}
          selectable={true}
          selectMirror={true}
          duration={{months: 1}}
          dayMaxEvents={isSmall ? 0 : 2}
          eventClick={(e) => {openPopup(parseInt(e.event.id))}}
          eventDisplay='block'
          display='background'
          eventStartEditable={true}
          height='auto'
          eventBackgroundColor='#899791'
          eventTextColor={darkMode ? COLORS.white : 'black'}
          eventTimeFormat={{hour:'2-digit', minute:'2-digit', meridiem:false, hour12:false }}/>

      </div>
  )
}

export default CalendarView

  
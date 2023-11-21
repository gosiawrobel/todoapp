import { React, useEffect, useState, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Container } from '@mui/material';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from "@fullcalendar/timegrid";
import { Calendar } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";
import dayjs from 'dayjs';
import { statusColorMapping } from '../utils/utils';

function CalendarView({ setTasks, tasks}) {
  
  // const [view, setView] = useState('dayGridMonth')
  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    status: task.status,
    date: new Date(task.endTime)
  }))

  function colorTaskStatus() {
    if (events.status == 'Done') {
     return {eventBackgroundColor: '#6fa17d'}
    } else if ( events.status == 'In progress') {
      return {eventBackgroundColor: '#e7d07d'}
    } else {
      return {eventBackgroundColor: '#9c4e4e'}
    }

  }
  function updateTaskinDB(task){
    task.endTime = dayjs(task.endTime).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss')
    fetch(`http://localhost:8080/tasks/${task.id}`, {
      method:'PUT',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((resp) => resp.json())
      .then((updatedTask) =>  {
        updatedTask.endTime = dayjs.utc(updatedTask.endTime).local().format("YYYY-MM-DD HH:mm ")
        setTasks((tasks) => tasks.map((task) => task.id == updatedTask.id ? updatedTask : task) )
      })
      .catch((err) => {
        console.log(`Error during editing task ${err}`)
      })
  }

  
  // const [view, setView] = useState('dayGridMonth')
  // const changeResolution = () => setView(window.innerWidth < 760 ? 'list' : 'dayGridMonth')
  
  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log('handleResize')
  //     changeResolution()
  //   }
  //   window.addEventListener('resize', handleResize)
  //   return () => { window.removeEventListener('resize', handleResize)}
  // },[])

  const handleEventDrop=(drop) => {
    const updateTaskDate = tasks.map((task)=> {
     if (task.id == drop.event.id){
      const updatedTask = { ...task, endTime: drop.event.startStr}
      updateTaskinDB(updatedTask)
      return updatedTask
     }
    return task
    })
    setTasks(updateTaskDate)
  }

  // useEffect(() => {
  //   const handleResize = () => { 
  //     const screenWidth = window.innerWidth;
  //     if (screenWidth < 760) {
  //       setView('list')
  //       console.log('dayGridDay')
  //       console.log(screenWidth)
  //     } else {
  //       setView('dayGridMonth')
  //       console.log('dayGrdiMonth')
  //       console.log(screenWidth)
  //     }
  //   }
  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return window.removeEventListener('resize', handleResize)
  // })



  return (
    <Container>
      <FullCalendar  
      plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin ]} 
      initialView={window.innerWidth < 760 ? 'list' : 'dayGridMonth'} 
      
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridDay,timeGridWeek,list'
      }} 
          eventDrop={handleEventDrop}
          droppable={true}
          slotLabelFormat={{hour: 'numeric', minute: '2-digit', hour12: false}}
          scrollTime="6:00"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          eventDisplay='block'
          display='background'
          eventStartEditable={true}
          eventBackgroundColor={() => {
              if (events.status == 'Done') {
              return {eventBackgroundColor: '#6fa17d'}
             } else if ( events.status == 'In progress') {
               return {eventBackgroundColor: '#e7d07d'}
             } else {
               return {eventBackgroundColor: '#9c4e4e'}
            }
          }}
          eventTimeFormat={{hour:'2-digit', minute:'2-digit', meridiem:false, hour12:false }}/>
    </Container>
  )
}

export default CalendarView

    
          // eventContent={(eventInfo) => {
          //   console.log(eventInfo)
          //   return (
          //     <div>
          //       <p>{eventInfo.event.startStr}</p>
          //       <p>{eventInfo.event.title}</p>
          //     </div>
          //   )
          // }}
        

          // aspectRatio={1.8}
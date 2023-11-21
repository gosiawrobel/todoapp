import React from 'react'
import {Card, CardContent, Typography, CardActions} from '@mui/material'
import { IconButton, ListItemButton} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { statusColorMapping } from '../utils/utils';

dayjs.extend(utc);
dayjs.extend(require('dayjs/plugin/timezone'));

function Task({onClick, setTasks, task}) {
  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/tasks/${taskId}`,{
    method:'DELETE'
    })
    .then((resp) => {
      if (resp.status ===200) {
        setTasks((tasks) =>{
          return tasks.filter((task) => {
            return task.id !== taskId
          })
        })
      }
    })
  }

 const setTaskDone = (task) => {
    task.endTime =  dayjs(task.endTime).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss')
   task.status = 'Done'
  fetch(`http://localhost:8080/tasks/${task.id}`, {
    method:'PUT',
    headers:{
        'Content-Type': 'application/json'
    },
    //to co wysylam do bazy danych
    body: JSON.stringify(task)
  }).then((resp) => resp.json())
    .then((taskFromBackend) =>  {
      task.endTime = dayjs.utc(task.endTime).local().format("YYYY-MM-DD HH:mm ")
      setTasks((tasks) => 
      tasks.map((task) => (taskFromBackend.id === task.id ? taskFromBackend : task))
      //po odp z serwera zmieniam stan frontu poprzez setTasks, robie mapa po wszystkich taskach i porownuje ich id do taska z fronta
      //aktualizuje tylkoe ten task co wrocil z backendu
      )
 })
    .catch((err) => {
      console.log(`Error during editing task ${err}`)
    })
 }

//  const handleTaskDone=(status) => {
//   const updateTaskStatus = tasks.map((task) => {
//     if (task.id == status.task.id){
//       const updatedStatus = {...task, status: task.status}
//       setTaskDone(updatedStatus)
//       return updatedStatus
//     }
//     return task
//   })
//   setTasks(updateTaskStatus)
//  }


  return (
    
    <Card>
      <ListItemButton onClick={() => onClick(task.id)}>
      <div className='dot' style={{background: statusColorMapping[task.status] }}></div>
        <CardContent>
          <Typography variant='h4' style={{fontFamily: `'Montserrat', sans-serif`, fontWeight:'500'}}> {task.title}</Typography>
          <Typography>{task.endTime ? dayjs(task.endTime).format("YYYY-MM-DD HH:mm ") : `No due date`}
          </Typography>
        </CardContent>
      </ListItemButton>
      <CardActions style={{justifyContent:'center'}}>
      
          <IconButton style={{width:'50%'}} size='large' onClick={()=> setTaskDone(task) }>
            <DoneIcon/>
          </IconButton>
    
       
        <IconButton style={{width:'50%'}} size='large' onClick={() => deleteTask(task.id)}>
          <DeleteIcon/>
        </IconButton>
  
      </CardActions>
  </Card>

  
  )
}

export default Task
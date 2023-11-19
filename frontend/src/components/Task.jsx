import React from 'react'
import {Card, CardContent, Typography, CardActions} from '@mui/material'
import { IconButton, ListItemButton} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(require('dayjs/plugin/timezone'));


function Task({onClick, taskId, title, endTime, setTasks, description}) {
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
  return (
    
    <Card>
      <ListItemButton onClick={() => onClick(taskId)}>
        <CardContent>
          <Typography variant='h4' style={{fontFamily: `'Montserrat', sans-serif`, fontWeight:'500'}}> {title}</Typography>
          <Typography>{endTime ? dayjs(endTime).format("YYYY-MM-DD HH:mm ") : `No due date`}
          </Typography>
        </CardContent>
      </ListItemButton>
      <CardActions>

        <div className='btn-box'>
        <IconButton size='large' onClick={() => console.log('Done icon')}><DoneIcon></DoneIcon></IconButton>
        <IconButton size='large' onClick={() => deleteTask(taskId)}><DeleteIcon></DeleteIcon></IconButton>
        </div>
      </CardActions>
  </Card>

  
  )
}

export default Task
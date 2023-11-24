import React from 'react'
import {Card, CardContent, Typography, CardActions} from '@mui/material'
import { IconButton, ListItemButton} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { statusColorMapping } from '../utils/utils';
import { updateTask } from '../utils/taskUtils';
import { deleteTask } from '../utils/taskUtils';
import { priorityMapping } from '../utils/utils';

dayjs.extend(utc);
dayjs.extend(require('dayjs/plugin/timezone'));

function Task({onClick, setTasks, task}) {

const setTaskDone = (task) => {
  task.status = 'Done'
  updateTask(setTasks, task)
}
  return (
    <Card id={task.id}>
      <ListItemButton onClick={() => onClick(task.id)}>
        <div className='dot' style={{background: statusColorMapping[task.status] }}></div>
        <div className='priority'>{priorityMapping.intToString[task.priority]}</div>
        <CardContent>
          <Typography variant='h4' style={{fontFamily: `'Montserrat', sans-serif`, fontWeight:'500'}}> {task.title}</Typography>
          <Typography>{task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD HH:mm ") : `No due date`}
          </Typography>
        </CardContent>
      </ListItemButton>
      <CardActions style={{justifyContent:'center'}}>
        <IconButton style={{width:'50%'}} size='large' onClick={()=> setTaskDone(task) }>
          <DoneIcon/>
        </IconButton>
        <IconButton style={{width:'50%'}} size='large' onClick={() => deleteTask(setTasks,task.id)}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Task
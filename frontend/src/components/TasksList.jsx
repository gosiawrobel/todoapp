import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box} from '@mui/material';
import { IconButton } from '@mui/material';
import  Task from './Task'
import TaskDetails from './TaskDetails';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

function AllTasks() {
  const[tasks, setTasks] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState()

  const openPopup=(taskId)=>{
    setSelectedTaskId(taskId)
    setPopupOpen(true)
  }

  const closePopup=() => {
    setPopupOpen(false)
  }

  const fetchTasks = () => {
    fetch('http://localhost:8080/tasks')
    .then((resp)=> resp.json())
    .then((data) => setTasks(data.map((task) => {
      task.endTime = dayjs.utc(task.endTime).local().format("YYYY-MM-DD HH:mm ")
      return task
    })))

  }

  useEffect(()=>{
    fetchTasks()
  }, []);

  return (
    <Container>
      <TaskDetails open={popupOpen} onClose={closePopup} tasks={tasks} setTasks={setTasks} selectedTaskId={selectedTaskId}></TaskDetails>
      <Grid container spacing={4}>
        {tasks.map((task) => 
          <Grid item>
            <Task key={task.id} title={task.title} endTime={task.endTime} onClick={openPopup} email={task.email} setTasks={setTasks} taskId={task.id} />
        </Grid>
        )}
        <Grid item>
        </Grid>
      </Grid>

      <Box sx={{  '& > :not(style)': { m: 1 } }}>
      <Fab color="info" onClick={() => openPopup(0)} aria-label="add" sx={{ background:'#5A6863',  position: 'absolute', bottom: 16, right: 16 ,'&:hover': {
        backgroundColor:'#3e4845'
      }}}>
        <AddIcon />
      </Fab>
      </Box>
    </Container>
  )

}

export default AllTasks
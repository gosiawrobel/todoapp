import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box} from '@mui/material';
import  Task from './Task'
import TaskDetails from './TaskDetails';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import  { COLORS } from '../utils/colors.js'

dayjs.extend(utc);
dayjs.extend(timezone);

function AllTasks({tasks, setTasks, darkMode}) {
  console.log(tasks)
  
  const [popupOpen, setPopupOpen] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState()

  const openPopup=(taskId)=>{
    setSelectedTaskId(taskId)
    setPopupOpen(true)
  }

  const closePopup=() => {
    setPopupOpen(false)
  }


  return (
    <Container data-testid={tasks.id}>
      <TaskDetails open={popupOpen} darkMode={darkMode} onClose={closePopup} tasks={tasks} setTasks={setTasks} selectedTaskId={selectedTaskId}></TaskDetails>
      <Grid container spacing={4} >
        {tasks.map((task) => 
          <Grid key={task.id} item xs={12} sm={'auto'}>
            <Task key={task.id}  onClick={openPopup} setTasks={setTasks} task={task} />
        </Grid>
        )}
        <Grid item>
        </Grid>
      </Grid>
      <Box sx={{  '& > :not(style)': { m: 1 } }}>
      <Fab color="info" onClick={() => openPopup(0)} aria-label="add" sx={{ background:COLORS.mainGreen,  position: 'fixed', bottom: 16, right: 16 ,'&:hover': {
        backgroundColor:COLORS.hoverAddBtn
      }}}>
        <AddIcon />
      </Fab>
      </Box>
    </Container>
  )
}

export default AllTasks
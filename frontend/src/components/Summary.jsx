import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Grid} from '@mui/material'
import  { Sidebar, Task } from '.'
import { PieChart } from '@mui/x-charts/PieChart';
import AllTasks from './AllTasks';
import  { Container } from '@mui/material';
import { statusColorMapping } from '../utils/utils';

function Summary({tasks,setTasks}) {
  const data = [
    { label: 'Not started', value: tasks.count((task) => task.status === 'Not started') },
    { label: 'In progress', value: tasks.count((task) => task.status === 'In progress') },
    { label: 'Done', value: tasks.count((task) => task.status === 'Done') },
  ];
  return (

    <Container>

      <Grid container>
      <PieChart sx={{stroke: 'none'}}
        colors={[statusColorMapping['Not started'], statusColorMapping['In progress'], statusColorMapping['Done']]}
        series={[
          {
            innerRadius: 150,
            outerRadius: 200,
            paddingAngle: 5,
            cornerRadius: 8,
            startAngle: -90,
            endAngle: 270,
            cx: 195,
            cy: 220,
            data,
          },
        ]}
        height={450}
        width={400}
        legend={{ hidden: true }}
      />
      
      <AllTasks tasks={tasks} setTasks={setTasks}/>

      </Grid>
    </Container>
   

  
  )
}

export default Summary




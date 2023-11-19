import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Navbar, Summary, AllTasks, Calendar, SearchTask, Sidebar} from './components'
import { useState, useEffect} from 'react'
import { Stack, Typography} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SortByMenu from './components/SortByMenu'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


// const theme = createMuiTheme({
//     typography: {
//         fontFamily:  'Montserrat, sans-serif',
//     }
// })

dayjs.extend(utc);
dayjs.extend(timezone);
const App = () => {
    const [selectedPath, setSelectedPath] = useState('Summary')
    const[tasks, setTasks] = useState([])
    const [sortingMethodName, setSortingMethodName] = useState('Date ascending')

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
        <Box sx={{ backgroundColor: "#C9C1C2"}} style={{ fontFamily: `'Montserrat', sans-serif`}}>
            <Navbar/>
        <Stack sx={{flexDirection: { sx: "column", md:"row"}}}>
            <Box sx={{ height: { sx: 'auto', md: '98vh'}, borderRight: '1px solid #3d3d3d', px: {sx:0, md:2}}}>
            <Sidebar 
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}>
                {selectedPath !== 'Calendar' ? <SortByMenu onSortingMethodChange={(name) => setSortingMethodName(name)}/> : <></>} 
            </Sidebar>
            <Typography className="copyright" variant="body2" sx={{ mt: 2, color:"#fff"}}>
                Copyright 2023
            </Typography>
            </Box>
            <Routes>
                <Route path="/" exact element={<Summary/>}></Route>
                <Route path="/tasks/" element={<AllTasks tasks={tasks} setTasks={setTasks} sortingMethodName={sortingMethodName}/>} />
                <Route path="/calendar" element={<Calendar/>} />
                <Route path="/search/:searchTerm" element={<SearchTask/>} />
            </Routes>
        </Stack>
        </Box>
        </BrowserRouter>
        </LocalizationProvider>
    )
}

export default App 
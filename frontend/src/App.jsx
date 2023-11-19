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
import FilterBy from './components/FilterBy'
import { priorityFilterName, priorityTags, statusTags, statusFilterName} from './utils/filterMethods'
import { sortingMethodFromName } from './utils/compareMtehods'

dayjs.extend(utc);
dayjs.extend(timezone);

const App = () => {
    const [selectedPath, setSelectedPath] = useState('Summary')
    const[tasks, setTasks] = useState([])
    const [sortingMethodName, setSortingMethodName] = useState('Date ascending')
    const [selectedPriorities, setSelectedPriority]=useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])

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
                <FilterBy onTagsListChange={(priorities)=> setSelectedPriority(priorities)} filterType={priorityFilterName} tagsList={priorityTags}/>
                <FilterBy onTagsListChange={(statuses) => setSelectedStatuses(statuses)}  filterType={statusFilterName} tagsList={statusTags}/>
            </Sidebar>
            <Typography className="copyright" variant="body2" sx={{ mt: 2, color:"#fff"}}>
                Copyright 2023
            </Typography>
            </Box>
            <Routes>
                <Route path="/" exact element={<Summary/>}></Route>
                <Route path="/tasks/" element={<AllTasks tasks={tasks.priorityFilter(selectedPriorities).statusFilter(selectedStatuses).toSorted(sortingMethodFromName[sortingMethodName])} setTasks={setTasks}/>} />
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
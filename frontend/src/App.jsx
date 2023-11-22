import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Navbar, Summary, AllTasks, Calendar, SearchTask, Sidebar, CalendarView} from './components'
import { useState, useEffect} from 'react'
import { Stack, Typography} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SortByMenu from './components/SortByMenu'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import FilterBy from './components/FilterBy'
import { priorityFilterName, priorityTags, statusTags, statusFilterName, timeTags, timeFilterName} from './utils/filterMethods'
import { sortingMethodFromName } from './utils/compareMtehods'
import NotFound from './components/NotFound'
import MyCalendar from './components/MyCalendar'
import { pathNameFromUrl as selectedPathFromUrl } from './utils/constants'
import { fetchTasks } from './utils/taskUtils'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness6Icon from '@mui/icons-material/Brightness7';
import { COLORS } from './utils/colors'

dayjs.extend(utc);
dayjs.extend(timezone);

const App = () => {
    const [selectedPath, setSelectedPath] = useState(selectedPathFromUrl(window.location.pathname))
    const[tasks, setTasks] = useState([])
    const [sortingMethodName, setSortingMethodName] = useState('Date ascending')
    const [selectedPriorities, setSelectedPriority]=useState([])
    const [selectedStatuses, setSelectedStatuses] = useState(statusTags)
    const [selectedTime, setSelectedTime]=useState([])
    const [darkMode, setDarkMode]=useState(false)

      useEffect(()=>{
        fetchTasks(setTasks)
        console.log('use effect')
      }, []);

    const changeMode=() => {
       setDarkMode((prev) => !prev)
    }    

    console.log(window.backgroundColor)  
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
        <Box sx={{ backgroundColor: darkMode ? COLORS.darkBackground : COLORS.lightBackground}} style={{ fontFamily: `'Montserrat', sans-serif`}}>
            <Navbar darkMode={darkMode} changeMode={changeMode}/>
        <Stack sx={{flexDirection: { sx: "column", md:"row"}}}>
        
            <Box sx={{ height: { sx: 'auto', md: '98vh'}, borderRight: `1px solid ${COLORS.sideLine}`, px: {sx:0, md:2}}}>
            <Sidebar 
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}>
                {selectedPath !== 'Calendar' ? <SortByMenu onSortingMethodChange={(name) => setSortingMethodName(name)}/> : <></>} 
                <FilterBy onTagsListChange={(priorities)=> setSelectedPriority(priorities)} filterType={priorityFilterName} tagsList={priorityTags}/>
                {selectedPath !== 'Summary' && selectedPath !== 'Tasks done'? <FilterBy onTagsListChange={(statuses) => setSelectedStatuses(statuses)}  filterType={statusFilterName} tagsList={statusTags}/> : <></>} 
                <FilterBy onTagsListChange={(time)=> setSelectedTime(time)} filterType={timeFilterName} tagsList={timeTags} singleChoice/>
            </Sidebar>
            </Box>
            <Routes>
             
                <Route path="/" exact element={<Summary tasks={tasks.priorityFilter(selectedPriorities).timeFilter(selectedTime).toSorted(sortingMethodFromName[sortingMethodName])} setTasks={setTasks}/>}></Route>
                <Route path="/tasks" element={<AllTasks foo={`to ja`}tasks={tasks.priorityFilter(selectedPriorities).statusFilter(selectedStatuses).timeFilter(selectedTime).toSorted(sortingMethodFromName[sortingMethodName])} setTasks={setTasks}/>} />
                <Route path="/calendar" element={<MyCalendar darkMode={darkMode} dayMaxEvents={window.screen.width < 600 ? 0 : 1} tasks={tasks} setTasks={setTasks}/>} />

                <Route path="/tasks_done" element={<AllTasks tasks={tasks.priorityFilter(selectedPriorities).statusFilter(['Done']).timeFilter(selectedTime).toSorted(sortingMethodFromName[sortingMethodName])} setTasks={setTasks}/> }/>
                <Route element={<NotFound/>}/>
            </Routes>
        </Stack>
        </Box>
        </BrowserRouter>
        </LocalizationProvider>
    )
}

export default App 
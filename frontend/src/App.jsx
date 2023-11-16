import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { Navbar, Summary, AllTasks, Calendar, SearchTask, Sidebar} from './components'
import { useState } from 'react'
import { Stack, Typography} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
    const [selectedPath, setSelectedPath] = useState('Summary')

    return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
    <Box sx={{ backgroundColor: "#C9C1C2"}}>
        <Navbar/>
    <Stack sx={{flexDirection: { sx: "column", md:"row"}}}>
        <Box sx={{ height: { sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx:0, md:2}}}>
        <Sidebar
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        />

        <Typography className="copyright" variant="body2" sx={{ mt: 2, color:"#fff"}}>
            Copyright 2022 
        </Typography>
        </Box>
        <Routes>
            <Route path="/" exact element={<Summary/>}></Route>
            <Route path="/tasks/" element={<AllTasks/>} />
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
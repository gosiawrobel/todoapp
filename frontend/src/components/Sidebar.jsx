import React from 'react'
import { useState } from 'react'
import { Stack } from '@mui/material'
import { paths } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import SortByMenu from './SortByMenu'


const Sidebar=({selectedPath, setSelectedPath, children}) => {
    const navigate = useNavigate()

    function handlePath (path) {
        setSelectedPath(path.name)
        navigate(`/${path.url}`)
    }
    return (
    

    <Stack 
      direction="row" 
      sx={{overflow:"auto", height: {sx: 'auto', md:'95%'}, flexDirection: {md:'column'}, marginTop:'10px'
      }}
      > 
    {paths.map((path) => (
        <button className="path-btn" 
        onClick={() => {handlePath(path)}}
        style={{background: path.name === selectedPath && '#5A6863', whiteSpace: 'nowrap', color: 'white', marginBottom:"15px"}}
            key={path.name}
            >
            <span style={{color: path.name === selectedPath ? 'white' : '#9B9C9C', marginRight:'15px'}}>{path.icon}</span>
            <span style={{ opacity: path.name === selectedPath ? '1' : '0.8'}}>{path.name}</span>
        </button>
    ))}

     {React.Children.map(children, (child) => child )}
    </Stack>
    )
}



export default Sidebar


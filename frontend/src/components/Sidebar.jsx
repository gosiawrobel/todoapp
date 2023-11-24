import React from 'react'
import { Stack } from '@mui/material'
import { paths } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import {COLORS} from '../utils/colors.js'

const Sidebar=({selectedPath, setSelectedPath, children}) => {
    const navigate = useNavigate()

    function handlePath (path) {
        setSelectedPath(path.name)
        navigate(`${path.url}`)
    }
    return (
    <Stack 
      direction="row" 
      sx={{overflow:"auto", height: {sx: 'auto', md:'95%'}, flexDirection: {md:'column'}, marginTop:'5px'
      }}> 
    {paths.map((path) => (
        <button className="path-btn" 
        onClick={() => {
            handlePath(path)}
        }
        style={{background: path.name === selectedPath && COLORS.mainGreen, whiteSpace: 'nowrap', color: COLORS.white, marginBottom:"15px"}}
            key={path.name}>
            <span style={{color: path.name === selectedPath ? COLORS.white : COLORS.sidbarOnClickTxt, marginRight:'15px'}}>{path.icon}</span>
            <span style={{ opacity: path.name === selectedPath ? '1' : '0.8'}}>{path.name}</span>
        </button>
    ))}
     {children}
    </Stack>
    )
}

export default Sidebar


import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from './Logo';
import SearchBar from './SearchBar';
import { COLORS } from '../utils/colors';
import Brightness6Icon from '@mui/icons-material/Brightness7';


const Navbar = ({darkMode, changeMode}) => (
  <Stack direction="row"
   alignItems="center" 
   p={2}
   sx ={{ position:"relative", background: darkMode ? COLORS.darkBackground:COLORS.lightBackground, top:0, justifyContent:"space-between"}} >
    <Link to="/" style={{display:"flex", alignItems:"center"}}>
     <Logo/>
    </Link>
     <SearchBar/>
     <Brightness6Icon sx={{ ml: 1 }} onClick={changeMode} color="inherit"/>
  </Stack> 
  )

export default Navbar
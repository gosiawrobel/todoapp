import React from 'react'
import { IconButton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from './Logo';
import SearchBar from './SearchBar';
import {COLORS} from '../utils/colors.js'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const Navbar = ({darkMode, changeMode}) => (
  <Stack direction="row"
   alignItems="center" 
   p={2}
   sx ={{ position:"relative", background: darkMode ? COLORS.darkBackground:COLORS.lightBackground, top:0, justifyContent:"space-between"}} >
    <Link to="/" style={{display:"flex", alignItems:"center"}}>
     <Logo/>
    </Link>
     <SearchBar/>
     <IconButton sx={{ ml: 1 }} onClick={changeMode} >{darkMode ? <Brightness7Icon style={{color:'white'}} /> : <Brightness4Icon />}</IconButton>
  </Stack> 
  )

export default Navbar
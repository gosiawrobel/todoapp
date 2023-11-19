import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Logo from './Logo';

import SearchBar from './SearchBar';

 

const Navbar = () => (
  
  <Stack direction="row"
   alignItems="center" 
   p={2}
   sx ={{ position:"stickt", background:"#C9C1C2", top:0, justifyContent:"space-between"}} >

    <Link to="/" style={{display:"flex", alignItems:"center"}}>
     <Logo/>
    </Link>
     <SearchBar/>

  </Stack>
    
  )

export default Navbar
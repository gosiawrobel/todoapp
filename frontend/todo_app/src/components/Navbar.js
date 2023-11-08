import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import { BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import '../style/App.css';



const Navbar=()=>{
return (
    <BottomNavigation  className='nav-bar'>
        {/* <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      /> */}
    </BottomNavigation>

) 
   


}

export default Navbar;
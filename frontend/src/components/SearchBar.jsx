import React from 'react'
import { Paper, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import { COLORS } from '../utils/colors'


function SearchBar() {
  return (
    <Paper component="form" onSubmit={() => {}}
    sx={{borderRadius:20,
    border: `1px solid ${COLORS.searchInput}`,
     pl:2, 
     boxShadow:'none', 
     mr: { sm: 5}}}>
       
    <input className='search-bar'
     placeholder="Search task..." 
     value="" 
     onChange={() => {}}/> 
     <IconButton type="submit" sx={{ p:'10px', color: COLORS.lightBackground}}> 
        <Search/>
     </IconButton>
    </Paper>

  )
}

export default SearchBar 
import React from 'react'
import { Paper, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'


function SearchBar() {
  return (
    <Paper component="form" onSubmit={() => {}}
    sx={{borderRadius:20,
    border: '1px solid #e3e3e3',
     pl:2, 
     boxShadow:'none', 
     mr: { sm: 5}}}>
       
    <input className='search-bar'
     placeholder="Search task..." 
     value="" 
     onChange={() => {}}/> 
     <IconButton type="submit" sx={{ p:'10px', color: '#C9C1C2'}}> 
        <Search/>
     </IconButton>
    </Paper>

  )
}

export default SearchBar 
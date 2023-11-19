import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import  { Sidebar, Task } from '.'



function Summary() {

  return (
    <Stack sx={{flexDirection: { sx: "column", md:"row"}}}>
      <Box p={2} sx={{overflowY: 'auto', height: '92vh',flex:2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white", marginLeft: "20px"}}> Summary
        </Typography>
      </Box>
    </Stack>
  
  )
}

export default Summary
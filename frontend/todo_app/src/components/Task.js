import * as React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from './Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


export default function Task({title, description, startTime, endTime}){
    return (
        // <Box className='task-box'>

        <Card className='task-card'>
            <CardContent>
                <h1>test</h1>
                <Typography>
                    <h2>{title}</h2>
                </Typography>
                <Typography>{description}</Typography>
                <Typography>{startTime}</Typography>
                <Typography>{endTime}</Typography>
                {/* <div className='btn-set'>
                <Button>
                <ModeEditIcon></ModeEditIcon>
                </Button> */}
                
                {/* </div> */}

            </CardContent>
        </Card>
        // </Box>
    )

} 
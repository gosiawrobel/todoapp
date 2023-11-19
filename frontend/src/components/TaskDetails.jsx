import { Dialog, Stack, TextField, IconButton } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { priorityMapping } from "../utils/utils";

function TaskDetails({open, onClose, tasks, setTasks, selectedTaskId}) {

    const [form, setForm]=useState({
        id:'',
        title: "",
        description: "",
        category:"",
        priority:"",
        email:"",
        status: ""
      })
      const [date, setDate] = useState({
        endTime:"",
      })
      const clearForm =()=>{
        setForm({
            id:0,
            title: "",
            description: "",
            category:"",
            priority:"Medium",
            email: "",
            status: "Not started"
        })
        setDate({
          startTime: "",
          endTime:"",
        })
      }
    useEffect(() => {
        if (selectedTaskId === 0) {
          clearForm()
        } else {
          let task = tasks.find(task => task.id === selectedTaskId)
          clearForm()
          if (task) {
            setForm({
              id: task.id,
              title: task.title,
              description: task.description,
              category: task.category,
              priority: priorityMapping.intToString[task.priority],
              email: task.email,
              status: task.status
            })
            setDate({
                endTime: task.endTime ? dayjs(task.endTime).toDate() : ''
            })
          }
        }
    }, [selectedTaskId, tasks])


    const handleDate = (selectedDate, name) => {
        setDate((prevValue) => ({
          ...prevValue,
          [name]: selectedDate,
        }))
      }


      const handleForm=(event) => {
        const {name, value} = event.target
        setForm((prevValue) => ({
          ...prevValue,
          [name]:value,
        }))
      }

    const updateTask = (setTasks, e) => {
        e.preventDefault();

        const timeUTC = dayjs(date.endTime).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss')

        const data =  {
            id: selectedTaskId,
            title: form.title,
            description: form.description,
            category: form.category,
            endTime: timeUTC,
            priority: priorityMapping.stringToInt[form.priority],
            email: form.email,
            status: form.status
        }
        fetch(`http://localhost:8080/tasks/${selectedTaskId}`, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then ((resp) => resp.json())
        .then((data) => 
            {
          
          data.endTime = dayjs.utc(data.endTime).local().format("YYYY-MM-DD HH:mm ")
          setTasks((tasks) => {
            return tasks.map(task => {
                if (task.id === data.id) {
                    return data
                } 
                return task
            })
          })
        onClose()
     
        })
        .catch((err) => {
          console.log('Error adding task', err)
        })
    } 

    const createTask = (setTasks, e) => {
        e.preventDefault();

        const timeUTC = dayjs(date.endTime).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss')

        const data =  {
            title: form.title,
            description: form.description,
            category: form.category,
            endTime:timeUTC,
            email: form.email,
            priority: priorityMapping.stringToInt[form.priority],
            status: form.status
        }
        fetch(`http://localhost:8080/tasks`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then ((resp) => resp.json())
        .then((data) => 
            {
          console.log('New task added', data)
          data.endTime = dayjs.utc(data.endTime).local().format("YYYY-MM-DD HH:mm ")
          setTasks((tasks) => {
           return tasks.concat(data)
          })

        onClose()
       
     
        })
        .catch((err) => {
          console.log('Error adding task', err)
        })
    } 
  return (
    <Dialog open={open} onClose={() => {
        onClose()
    }} fullWidth> 
    <DialogTitle>{selectedTaskId ? 'Edit task' : 'Create task'} <IconButton style={{float:'right'}} onClick={() => {
        onClose()
    }}><CloseIcon></CloseIcon></IconButton></DialogTitle>
        <DialogContent>
            <Stack spacing={2} margin={2} >
                <TextField required type="text" name="title" label="Title" variant="outlined" value={form.title} onChange={handleForm} ></TextField>
                <TextField type="text" name="description" id="outlined-multiline-flexible" multiline minRows={3} label="Description" variant="outlined" value={form.description} onChange={handleForm}></TextField>
            
               
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="priority"
                    id="demo-simple-select"
                    value={form.priority}
                    label="Priority"
                    onChange={handleForm}
                    >
                    <MenuItem value={'Low'}>Low</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'High'}>High</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    name="status"
                    id="demo-simple-select"
                    value={form.status}
                    label="Status"
                    onChange={handleForm}
                    >
                    <MenuItem value={'Not started'}>Not started</MenuItem>
                    <MenuItem value={'In progress'}>In progress</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                    </Select>
                </FormControl>
   
                <TextField type="text" name="email" label="email" variant="outlined" value={form.email} onChange={handleForm}> </TextField>
                <DemoContainer components={['DateField']}>
                    <DateTimePicker type="date" timeSteps={{hours: 1, minutes: 1, seconds: 1}} name="endTime" ampm={false} label="Date" value={dayjs(date.endTime)} onChange={(selectedDate) => handleDate(selectedDate, "endTime")}/>
              </DemoContainer>
            </Stack>
        </DialogContent>
        <DialogActions>
        <IconButton className='icon-btn' arial-label="send" onClick={(e) => {
            if (form.id === 0) {
                createTask(setTasks,e)
            } else {
                updateTask(setTasks, e)
            }
            }} >
        <SendIcon className='icon' fontSize="large"/>
        </IconButton>
        </DialogActions>
            
    </Dialog> 
  )
}

export default TaskDetails




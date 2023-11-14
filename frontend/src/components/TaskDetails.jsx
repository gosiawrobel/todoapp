import { Dialog, Stack, TextField, IconButton } from "@mui/material";
import React from "react";
import { useState } from "react";
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


function TaskDetails({open, onClose, tasks, setTasks, selectedTaskId}) {

    const [form, setForm]=useState({
        id:'',
        title: "",
        description: "",
        category:"",
        priority:"",
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
            priority:"",
            status: "Not started"
        })
        setDate({
          startTime: "",
          endTime:"",
        })
      }
    let task = tasks.find(task => task.id === selectedTaskId)

    if (task && task.id !== form.id){
        setForm(task)
        setDate({
            endTime: task.endTime ? dayjs(task.endTime).toDate() : ''
        })
    } else if (selectedTaskId === 0 && form.id !== 0) {
       clearForm()
    }

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
        const data =  {
            id: selectedTaskId,
            title: form.title,
            description: form.description,
            category: form.category,
            startTime: date.startTime,
            endTime: date.endTime,
            priority: form.priority,
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
          console.log('New task added', data)
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
        const data =  {
            title: form.title,
            description: form.description,
            category: form.category,
            startTime: date.startTime,
            endTime: date.endTime,
            priority: form.priority,
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
          setTasks((tasks) => {
           return tasks.concat(data)
          })

        onClose()
        clearForm()
     
        })
        .catch((err) => {
          console.log('Error adding task', err)
        })
    } 
  return (
    <Dialog open={open} onClose={() => {
        onClose()
        clearForm()
    }} fullWidth> 
    <DialogTitle>{selectedTaskId ? 'Edit task' : 'Create task'} <IconButton style={{float:'right'}} onClick={() => {
        onClose()
        clearForm()
    }}><CloseIcon></CloseIcon></IconButton></DialogTitle>
        <DialogContent>
            <Stack spacing={2} margin={2}>
                <TextField required type="text" name="title" label="Title" variant="outlined" value={form.title} onChange={handleForm} ></TextField>
                <TextField type="text" name="description" id="outlined-multiline-flexible" multiline minRows={3} label="Description" variant="outlined" value={form.description} onChange={handleForm}></TextField>
                <TextField type="number" name="priority" label="Priority" variant="outlined" value={form.priority} onChange={handleForm}> </TextField>
                
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
   
                <DemoContainer components={['DateField']}>
                    <DateTimePicker type="date" name="endTime" label="Date" value={dayjs(date.endTime)} onChange={(selectedDate) => handleDate(selectedDate, "endTime")}/>
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



// value={date.endTime}

{/* <Dialog open={open} onClose={handleClosePopup} fullWidth>
<DialogTitle>Add Task!<IconButton style={{float:'right'}} onClick={handleClosePopup}><CloseIcon></CloseIcon></IconButton></DialogTitle>
<DialogContent> 
  <Stack spacing={2} marigin={2}>
    <TextField required type="text" name="title" label="Title" variant="outlined" value={form.title} onChange={handleForm}>Title</TextField>
    <TextField type="text" name="description" label="Description" variant="outlined" value={form.description} onChange={handleForm}></TextField>
    <TextField type="number" name="category" label="Category" variant="outlined" value={form.category} onChange={handleForm}></TextField>
    <DemoContainer components={['DateField', 'DateField']}>
    <DateTimePicker type="date" name="startTime"label="Start time" value={date.startTime} onChange={(selectedDate) => handleDate(selectedDate,"startTime")}/>
    <DateTimePicker type="date" name="endTime" label="End time" value={date.endTime} onChange={(selectedDate) => handleDate(selectedDate, "endTime")}/>
    </DemoContainer>
    <TextField type="number" name="priority" label="Priority" variant="outlined" value={form.priority} onChange={handleForm}></TextField>
    <TextField type="text" name="status" label="Status" variant="outlined" value={form.status} onChange={handleForm}></TextField>
  </Stack>
</DialogContent>
<DialogActions>
    <IconButton className='icon-btn' arial-label="send" onClick={(e) => {addTask(props.setTask, e)}} >
      <SendIcon className='icon' fontSize="large"/>
    </IconButton>
</DialogActions>
</Dialog> */}
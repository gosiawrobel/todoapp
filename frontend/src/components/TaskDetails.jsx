import { Dialog, Stack, TextField, IconButton } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { priorityMapping } from "../utils/utils";
import { updateTask, createNewTask } from "../utils/taskUtils";
import { priorityTags, statusTags } from "../utils/filterMethods";
import { COLORS } from "../utils/colors";

function TaskDetails({open, onClose, tasks, setTasks, selectedTaskId, darkMode}) {
  const today = new Date()
  const currentDate = dayjs.utc(today.dueDate).local().format("YYYY-MM-DD HH:mm ")

  const [form, setForm]=useState({
      id:'',
      title: "",
      description: "",
      category:"",
      priority:"",
      email:'example@mail.com',
      status: "",
      dueDate:currentDate
  })

  const clearForm =()=>{
    setForm({
        id:0,
        title: "",
        description: "",
        category:"",
        email: 'example@mail.com',
        priority:"Medium",
        status: "Not started",
        dueDate:currentDate
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
          status: task.status,
          dueDate: task.dueDate ? dayjs(task.dueDate).toDate() : currentDate
        })
      }
    }
  }, [selectedTaskId, tasks])

  const handleForm=(event) => {
    const {name, value} = event.target
    setForm((prevValue) => ({
      ...prevValue,
      [name]:value,
    }))
  }
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email) && email !== '';
  }
  
  const updateTaskSubmit = (setTasks, e) => {
      e.preventDefault()
    if (!isValidEmail(form.email)){
      return
    }
    const task =  {...form,
        id: selectedTaskId,
        priority: priorityMapping.stringToInt[form.priority],
    }
      updateTask(setTasks, task, onClose, (err)=>console.log(err))
  } 

    const createTask = (setTasks, e) => {
        e.preventDefault();
        if (!isValidEmail(form.email)){
          return
        }
        const task =  {...form,
            priority: priorityMapping.stringToInt[form.priority]
        }
        createNewTask(setTasks, task, onClose) 
    } 

  return (
    <Dialog style={{zIndex:12}} open={open} onClose={() => {
      onClose()
    }} fullWidth> 
    <DialogTitle style={{backgroundColor: darkMode ? COLORS.dark.darkForm : COLORS.white}}>{selectedTaskId ? 'Edit task' : 'Create task'} <IconButton style={{float:'right'}} onClick={() => {
        onClose()
    }}><CloseIcon/></IconButton></DialogTitle>
        <DialogContent style={{backgroundColor: darkMode ? COLORS.notStarted : COLORS.white}}>
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
                    onChange={handleForm}>
                    {priorityTags.map((priorityTag) => <MenuItem id={priorityTag} value={priorityTag}>{priorityTag}</MenuItem>)}
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
                    onChange={handleForm}>
                    {statusTags.map((statusTag) => <MenuItem id={statusTag} value={statusTag}>{statusTag}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField required type="email" name="email" label="Email" variant={"outlined"} {...isValidEmail(form.email) ? {} : {id:"outlined-error-helper-text", helperText:"Provide valid email!", error:true}} value={form.email} onChange={handleForm}></TextField>
                    <DateTimePicker type="date" timeSteps={{hours: 1, minutes: 1, seconds: 1}} name="dueDate" ampm={false} label="Date" value={dayjs(form.dueDate)} onChange={(selectedDate) => handleForm({target:{name:"dueDate" ,value: selectedDate}})}/>
            </Stack>
        </DialogContent>
        <DialogActions>
        <IconButton className='icon-btn' arial-label="send" onClick={(e) => {
            if (form.id === 0) {
                createTask(setTasks,e)
            } else {
              updateTaskSubmit(setTasks, e)}
            }} >
        <SendIcon className='icon' fontSize="large"/>
        </IconButton>
        </DialogActions>
    </Dialog> 
  )
}

export default TaskDetails




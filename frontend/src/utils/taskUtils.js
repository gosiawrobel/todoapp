import dayjs from "dayjs"



//from app.jsx
const fetchTasks = (setTasks) => {
    fetch('http://localhost:8080/tasks')
    .then((resp)=> resp.json())
    .then((data) => setTasks(data.map((task) => {
      task.dueDate = dayjs.utc(task.dueDate).local().format("YYYY-MM-DD HH:mm ")
      return task
    })))
  }


  const updateTask = (setTasks, task, onSuccess, onFail) => {
    task.dueDate = dayjs(task.dueDate).utcOffset(0).format('YYYY-MM-DDTHH:mm:ss')
    
    fetch(`http://localhost:8080/tasks/${task.id}`, {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        //to co wysylam do bazy danych
        body: JSON.stringify(task)
    })
    .then ((resp) => resp.json())
    .then((respTask) => 
    {
        respTask.dueDate = dayjs.utc(respTask.dueDate).local().format("YYYY-MM-DD HH:mm ")
        setTasks((tasks) => {
            return tasks.map(task => {
                if (task.id === respTask.id) {
                    return respTask
                } 
                return task})})
        if(onSuccess) {
            onSuccess(respTask)}
    })
    .catch((err) => {
      if(onFail){
        onFail(err, task)}
    })
} 


const createNewTask = (setTasks, task, onSuccess, onFail) => {
    task.dueDate = dayjs(task.dueDate).utcOffset(0).format
    ('YYYY-MM-DDTHH:mm:ss')
    task.id = null
    
    fetch(`http://localhost:8080/tasks`, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(task)
    })
    .then ((resp) => resp.json())
    .then((respTask) => 
    {
        respTask.dueDate = dayjs.utc(respTask.dueDate).local().format("YYYY-MM-DD HH:mm ")
        setTasks((tasks) => {
            return tasks.concat(respTask)
        })
        if(onSuccess) {
            onSuccess(respTask)}
    })
    .catch((err) => {
      if(onFail){
        onFail(err, task)}
    })

}
const deleteTask = (setTasks, taskId) => {
    fetch(`http://localhost:8080/tasks/${taskId}`,{
    method:'DELETE'
    })
    .then((resp) => {
      if (resp.status ===200) {
        setTasks((tasks) =>{
          return tasks.filter((task) => {
            return task.id !== taskId
          })
        })
      }
    })
  }




export { fetchTasks, updateTask, createNewTask, deleteTask }



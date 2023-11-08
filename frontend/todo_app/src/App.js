import React, {useEffect, useState} from 'react';
import './style/App.css';
import Navbar from './components/Navbar';
import Task from './components/Task';






function App() {

  const[task, setTask] = useState([])

  const fetchTask = () => {
    fetch('http://localhost:8080/tasks')
    .then((resp)=> resp.json())
    .then((data) => setTask(data))
  }
  

  useEffect(()=>{
   fetchTask()

  }, []);

  

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <Navbar/>
      
      {task.map((task)=> <Task key={task.id} id={task.id}title={task.title} description={task.description} startTime={task.startTime} endTime={task.endTime}/>
      )} 
    </div>
  );

  }
export default App;
  
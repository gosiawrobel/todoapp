package com.todo.todo_app.Controllers;


import com.todo.todo_app.Entities.Task;
import com.todo.todo_app.ExceptionHandlers.DeleteError;
import com.todo.todo_app.Repositories.TaskRepository;
import com.todo.todo_app.Services.TaskReminder;
import com.todo.todo_app.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;


    private final TaskReminder taskReminder;

    public TaskController(TaskService taskService, TaskReminder taskReminder) {
        this.taskService = taskService;
        this.taskReminder = taskReminder;
    }

    @GetMapping("")
    public List<Task> getAll(
            @RequestParam(name="title", required = false) String title
    ){
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping("")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        Task newTask = taskService.addTask(task);
        taskReminder.sendTaskNotif(newTask);
        return ResponseEntity.ok(newTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTaskById(@PathVariable("id") Long id, @RequestBody Task updatedTask){
        System.out.println(updatedTask.getEndTime());
        Task task=taskService.updateTaskById(id, updatedTask);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable ("id") Long taskId){
        try{
            taskService.deleteTaskById(taskId);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (DeleteError err){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }
}


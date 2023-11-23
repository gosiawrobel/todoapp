package com.todo.todo_app.Services;


import com.todo.todo_app.Entities.Task;
import com.todo.todo_app.ExceptionHandlers.DeleteError;
import com.todo.todo_app.ExceptionHandlers.ResourceNotFound;
import com.todo.todo_app.ExceptionHandlers.ValidationError;
import com.todo.todo_app.Repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }


    public Task getTaskById(Long id){
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFound("Sorry there is no such task :("));
    }

    public Task addTask(Task task){
        if (task.getTitle() == null || task.getTitle().isEmpty()) {
            throw new ValidationError("Title is required!");
        }
        if (task.getEmail() == null || task.getEmail().isEmpty()){
            throw new ValidationError("Email is required!");
        }
        task.setReminderSent(false);
        taskRepository.save(task);
        return task;
    }
    public Task updateTask(Task task) {
        taskRepository.save(task);
        return task;
    }

    public Task updateTaskById(Long id, Task updatedTask){

        Task existingTask=taskRepository.findById(id).orElseThrow();

        if (updatedTask.getdueDate() != existingTask.getdueDate()) {
            existingTask.setReminderSent(false);
        }

        if (updatedTask.getStatus().equals("Done")) {
            existingTask.setReminderSent(true);
        }

        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setdueDate(updatedTask.getdueDate());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setStatus(updatedTask.getStatus());



        if (updatedTask.getTitle() == null || updatedTask.getTitle().isEmpty()){
            throw new ValidationError("Title is required!");
        }
        return taskRepository.save(existingTask);
    }

    //dodane to text searching
    public List<Task> searchTaskByTitle(String keyword) {
       return taskRepository.findByTitleContainingIgnoreCase(keyword);
    }
// koniec
    public void deleteTaskById(Long id){
        Task task=taskRepository.findById(id).orElseThrow(() -> new DeleteError("Couldn't delete task, task not found"));
        taskRepository.deleteById(id);
    }
}

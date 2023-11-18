package com.todo.todo_app.Services;


import com.todo.todo_app.Entities.Task;
import com.todo.todo_app.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.List;

@Service
public class TaskReminder {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private  TaskService taskService;


    @Value("${spring.mail.username}")
    private String senderEmail;


    @Scheduled(cron="0 0/1 * * * ?")
    public void sendTaskReminders() {
        Instant currentTime = Instant.now();
        LocalDateTime currentTimeUTC = LocalDateTime.ofInstant(currentTime, ZoneOffset.UTC);
        LocalDateTime reminderTime = currentTimeUTC.plusMinutes(30);

        List<Task> upcomingTask = taskRepository.findByEndTimeBetween(currentTimeUTC, reminderTime);

        for (Task task : upcomingTask){
            if (!task.isReminderSent()) {
                sendEmailReminder(task);
            }
        }
    }
    @Async
    public void sendTaskNotif(Task newTask){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(newTask.getEmail());
        message.setSubject("New task added!");
        message.setText(("You added a new task: " + newTask.getTitle()));

        javaMailSender.send(message);
    }

    public void sendEmailReminder(Task task){

        if (task.getEmail() == null){
            System.out.println("Email address is null for task: " + task.getTitle());
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(task.getEmail());
        message.setSubject(("Task reminder!"));
        message.setText("Hi, you have upcoming task in 30 minutes: " +  task.getTitle());

        javaMailSender.send(message);
        task.setReminderSent(true);
        taskService.updateTask(task);
    }
}

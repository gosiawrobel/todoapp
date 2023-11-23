package com.todo.todo_app.Entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;

import java.time.LocalDateTime;
import java.util.Date;


//@JsonFormat(pattern="yyyy-MM-dd")
@Entity
public class Task {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String description;
    private Integer category;

    private Integer priority;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone="UTC")
    private LocalDateTime dueDate;
    private String status;
    private String email;

    private boolean reminderSent = false;

    public Task(boolean reminderSent) {
        this.reminderSent = reminderSent;
    }

    public boolean isReminderSent() {
        return reminderSent;
    }

    public void setReminderSent(boolean reminderSent) {
        this.reminderSent = reminderSent;
    }

    public Task(String title, String description, String email, boolean reminderSent, LocalDateTime dueDate, Integer priority,  String status) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.email = email;
        this.reminderSent = reminderSent;
    }

    public Task() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public LocalDateTime getdueDate() {
        return dueDate;
    }

    public void setdueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

}

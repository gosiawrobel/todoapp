package com.todo.todo_app.Entities;


import com.fasterxml.jackson.annotation.JsonFormat;
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

   @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone="UTC")
    private LocalDateTime startTime;

    private Integer priority;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone="UTC")
    private LocalDateTime endTime;
    private Integer estimate;
    private Integer timeSpent;
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

    public Task(String title, String description, Integer category, String email, boolean reminderSent, LocalDateTime startTime, LocalDateTime endTime, Integer priority, Integer estimate, Integer timeSpent, String status) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
        this.priority = priority;
        this.estimate = estimate;
        this.timeSpent = timeSpent;
        this.status = status;
        this.email = email;
        this.category = category;
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

    public Integer getCategory() {
        return category;
    }

    public void setCategory(Integer category) {
        this.category = category;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Integer getEstimate() {
        return estimate;
    }

    public void setEstimate(Integer estimate) {
        this.estimate = estimate;
    }

    public Integer getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(Integer timeSpent) {
        this.timeSpent = timeSpent;
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

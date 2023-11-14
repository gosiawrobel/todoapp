package com.todo.todo_app.Services;

public interface EmailSender {
    void sendEmail(String to, String subject, String message);
}

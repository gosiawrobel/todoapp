package com.todo.todo_app.ExceptionHandlers;

public class ValidationError extends RuntimeException{
    public ValidationError(String message) {super(message);}
}

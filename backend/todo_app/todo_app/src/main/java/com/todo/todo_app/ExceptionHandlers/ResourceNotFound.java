package com.todo.todo_app.ExceptionHandlers;

public class ResourceNotFound extends RuntimeException{
    public ResourceNotFound(String message) {super(message);}
}

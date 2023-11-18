package com.todo.todo_app.ExceptionHandlers;

public class DeleteError extends RuntimeException {
    public DeleteError(String message){
        super(message);
    }
}

package com.todo.todo_app.ExceptionHandlers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(ResourceNotFound.class)
    public ResponseEntity<String> handleResourceNotFound(ResourceNotFound err){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
    }

    @ExceptionHandler(ValidationError.class)
    public ResponseEntity<String> badRequest(ValidationError err){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.getMessage());
    }

    @ExceptionHandler(DeleteError.class)
    public ResponseEntity<String> deleteError(DeleteError err){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
    }
}

package com.todo.todo_app.Services;


import com.todo.todo_app.Entities.UserTodo;
import com.todo.todo_app.ExceptionHandlers.DeleteError;
import com.todo.todo_app.ExceptionHandlers.ResourceNotFound;
import com.todo.todo_app.ExceptionHandlers.ValidationError;
import com.todo.todo_app.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<UserTodo> getAllUsers() {
        return userRepository.findAll();
    }

    public UserTodo getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFound("User not found" + id));
    }

    public UserTodo addUser(UserTodo user){
        if (user.getName() == null || user.getName().isEmpty()) {
            throw new ValidationError("Name is required!");
        } else if (user.getEmail() == null|| user.getEmail().isEmpty()) {
            throw new ValidationError("Email is required");

        }
        userRepository.save(user);
        return user;
    }

    public void deleteUser(Long userId){
        UserTodo user = userRepository.findById(userId).orElseThrow(() -> new DeleteError("User not found"));
        userRepository.deleteById(userId);
    }

    public UserTodo updateUser(Long id, UserTodo updatedUser){
        UserTodo existingUser=userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found" + id));
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setName(updatedUser.getName());

        if (existingUser.getName() == null || existingUser.getName().isEmpty()) {
            throw new ValidationError("Title is required!");
        } else if (existingUser.getEmail() == null|| existingUser.getEmail().isEmpty()) {
            throw new ValidationError("Email is required");

        }
        return userRepository.save(existingUser);

    }
}

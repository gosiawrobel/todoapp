package com.todo.todo_app.Controllers;


import com.todo.todo_app.Entities.UserTodo;
import com.todo.todo_app.ExceptionHandlers.DeleteError;
import com.todo.todo_app.Services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{id}")
    public ResponseEntity<UserTodo> getUserById(@PathVariable("id") Long id) {
        UserTodo user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("")
    public List<UserTodo> getAllUsers(){
        return userService.getAllUsers();
    }





    @PostMapping("")
    public UserTodo addUser(@RequestBody UserTodo user) {
        return userService.addUser(user);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserTodo> updateUser(@PathVariable("id") Long id, @RequestBody UserTodo updatedUser) {
        UserTodo user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User deleted successfully!");
        } catch (DeleteError err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }
}


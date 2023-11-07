package com.todo.todo_app.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UserTodo {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String email;

    public UserTodo(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public UserTodo() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

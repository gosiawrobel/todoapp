package com.todo.todo_app.Repositories;

import com.todo.todo_app.Entities.UserTodo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserTodo, Long> {
}

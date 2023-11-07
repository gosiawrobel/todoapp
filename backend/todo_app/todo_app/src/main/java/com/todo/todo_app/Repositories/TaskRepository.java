package com.todo.todo_app.Repositories;

import com.todo.todo_app.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}

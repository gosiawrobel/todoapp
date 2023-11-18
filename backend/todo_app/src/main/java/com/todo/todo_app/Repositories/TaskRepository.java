package com.todo.todo_app.Repositories;

import com.todo.todo_app.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Long> {

    //próbuje dodać text searching
    List<Task> findByTitleContainingIgnoreCase(String title);
    // koniec
    List<Task> findByEndTimeBetween(LocalDateTime startTime, LocalDateTime endTime);

}

package com.kaiduo.todo.app;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TodoHardCodedService {
	private static List<Todo> todos = new ArrayList<Todo>();
	
	private static long idCounter = 0;
	
	static {
		todos.add(new Todo(++idCounter, "leoleo", "learn react", new Date(), false));
		todos.add(new Todo(++idCounter, "aarisaaris", "learn nodejs", new Date(), false));
		todos.add(new Todo(++idCounter, "leoaaris", "learn springboot", new Date(), false));
	}
	
	public List<Todo> findAll() {
		return todos;
	}
	
	public Todo deleteById(Long id) {
		Todo todo = findById(id);
		if(todo == null)
			return null;
		todos.remove(todo);
		return todo;
	}
	
	public Todo findById(Long id) {
		for(Todo todo:todos) {
			if(todo.getId() == id)
				return todo;
		}
		return null;
	}
	
	public Todo saveTodo(Todo todo) {
		if(todo.getId() == -1 || todo.getId() == 0) {
			todo.setId(++idCounter);
			todos.add(todo);
		}
		else {
			deleteById(todo.getId());
			todos.add(todo);
		}
		return todo;
	}
}

import express from 'express';
import todoController from '../controllers/todo.controller.js';

const route = express.Router();

// GET all todos
route.get('/todos', todoController.getAllTodos);

// GET a todo by ID
route.get('/todos/:id', todoController.getTodoById);

// POST create a new todo
route.post('/todos', todoController.createTodo);

// PUT update a todo by ID
route.put('/todos/:id', todoController.updateTodoById);

// DELETE a todo by ID
route.delete('/todos/:id', todoController.deleteTodoById);


export default route;
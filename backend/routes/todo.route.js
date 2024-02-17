import express from 'express';
import todoController from '../controllers/todo.controller.js';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';


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

// Register a new user
route.post('/register', userController.register);

// Login user
route.post('/login', userController.login);

// Protected route (example)
route.get('/protected', authMiddleware, (req, res) => {
  // Access the user ID attached by the middleware
  const userId = req.userId;  
  res.json({ message: 'Protected resource accessed successfully', userId });
});


export default route;
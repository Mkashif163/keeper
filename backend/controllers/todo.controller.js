import Todo from "../modals/todo.modal.js";

const todoController = {
  // Get all todos
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new todo
  createTodo: async (req, res) => {
    const { title, description } = req.body;
    const todo = new Todo({
      title,
      description,
    });

    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get a single todo by ID
  getTodoById: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo === null) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a todo by ID
  updateTodoById: async (req, res) => {
    const { title, description, done } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description, done }, { new: true });
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a todo by ID
  deleteTodoById: async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default todoController;

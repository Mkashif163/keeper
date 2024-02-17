import express from 'express';

const route = express.Router();

route.post("/todos", (req, res) => {
    console.log(req.body);
});
// route.post('/todos', addTodo)
// route.get('/todos', getAllTodos);
// route.get('/todos/:id', toggleTodoDone);
// route.put('/todos/:id', updateTodo);
// route.delete('/todos/:id', deleteTodo);


export default route;
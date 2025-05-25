import express from 'express';
import cors from 'cors';

import { readFile, writeFile } from 'node:fs/promises';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.get('/todos', async (_req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  // console.log(todos);

  return res.status(200).json(todos);
});

app.get('/todos/:todoId', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const todoId = req.params.todoId;

  const todo = todos.find((todo) => todo.id === Number(todoId));

  if (todo) {
    return res.status(200).json(todo);
  }

  return res.status(404).send('404 Not Found');
});

// TODO: From get to delete
app.delete('/todos/:todoId', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const todoId = req.params.todoId;
  const filteredTodos = todos.filter((todo) => todo.id !== Number(todoId));

  await writeFile('./data.json', JSON.stringify(filteredTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo deleted successfully',
  });
});

// TODO: From get to post(A little trap here, be careful ^_^)
app.post('/todos', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const addTodo = req.body;

  const updatedTodos = [...todos, addTodo];

  await writeFile('./data.json', JSON.stringify(updatedTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo added successfully',
  });
});

// TODO: From get to patch
app.patch('/todos', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const updateTodo = req.body;

  const updatedTodos = todos.map((todo) => {
    if (todo.id === updateTodo.id) {
      return {
        ...todo,
        ...updateTodo,
      };
    }

    return todo;
  });

  await writeFile('./data.json', JSON.stringify(updatedTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo updated successfully',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

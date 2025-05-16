import express from 'express';
import cors from 'cors';

import { readFile, writeFile } from 'node:fs/promises';

const app = express();
app.use(cors());

const port = 3000;

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

app.get('/todos/delete/:todoId', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const todoId = req.params.todoId;

  const filteredTodos = todos.filter((todo) => todo.id !== Number(todoId));

  await writeFile('./data.json', JSON.stringify(filteredTodos), 'utf-8');

  // console.log(todos);

  return res.status(200).json({
    message: 'Todo deleted successfully',
  });
});

app.get('/todos/add/:addTodo', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const addTodo = req.params.addTodo;
  const parsedAddTodo = JSON.parse(addTodo);

  const updatedTodos = [...todos, parsedAddTodo];

  await writeFile('./data.json', JSON.stringify(updatedTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo added successfully',
  });
});

app.get('/todos/update/:updateTodo', async (req, res) => {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const updateTodo = req.params.updateTodo;
  const parsedUpdateTodo = JSON.parse(updateTodo);

  const updatedTodos = todos.map((todo) => {
    if (todo.id === parsedUpdateTodo.id) {
      return {
        ...todo,
        ...parsedUpdateTodo,
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

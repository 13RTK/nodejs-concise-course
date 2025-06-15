import {
  getAllTodos,
  getTodoById as getTodoByIdApi,
  deleteTodoById as deleteTodoByIdApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  countTodo as countTodoApi,
} from '../services/todoService.js';

export async function getTodos(req, res) {
  const page = req.query.page;
  const limit = req.query.limit;

  const offset = (page - 1) * limit;

  const todos = await getAllTodos(offset, limit);

  return res.status(200).json(todos);
}

export async function getTodoById(req, res) {
  if (!req.params.todoId) {
    return res.status(400).send('todoId is required');
  }

  const todo = await getTodoByIdApi(req.params.todoId);

  if (todo) {
    return res.status(200).json(todo);
  }

  return res.status(404).send('404 Not Found');
}

export async function deleteTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).send('todoId is required');
  }

  await deleteTodoByIdApi(todoId);

  return res.status(200).json({
    message: 'Todo deleted successfully',
  });
}

export async function createTodo(req, res) {
  const addTodo = req.body;

  if (!addTodo) {
    return res.status(400).send('Bad request');
  }

  const addedTodo = await createTodoApi(addTodo);

  return res.status(200).json({
    message: 'Todo added successfully',
    data: addedTodo,
  });
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  const updatedTodo = await updateTodoApi(updateTodo);

  return res.status(200).json({
    message: 'Todo updated successfully',
    data: updatedTodo,
  });
}

export async function countTodo(_req, res) {
  const todoCount = await countTodoApi();

  return res.status(200).json({
    count: todoCount,
  });
}

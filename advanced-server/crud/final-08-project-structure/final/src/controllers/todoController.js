import { readFile, writeFile } from 'node:fs/promises';

export async function getTodos(_req, res) {
  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  // console.log(todos);

  return res.status(200).json(todos);
}

export async function getTodoById(req, res) {
  const todoId = req.params.todoId;

  if (!todoId) {
    return res.status(400).send('todoId is required');
  }

  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const todo = todos.find((todo) => todo.id === Number(todoId));

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

  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const filteredTodos = todos.filter((todo) => todo.id !== Number(todoId));

  await writeFile('./data.json', JSON.stringify(filteredTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo deleted successfully',
  });
}

export async function createTodo(req, res) {
  const addTodo = req.body;
  if (!addTodo) {
    return res.status(400).send('400 Bad Request');
  }

  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

  const updatedTodos = [...todos, addTodo];

  await writeFile('./data.json', JSON.stringify(updatedTodos), 'utf-8');

  return res.status(200).json({
    message: 'Todo added successfully',
  });
}

export async function updateTodo(req, res) {
  const updateTodo = req.body;

  if (!updateTodo) {
    return res.status(400).send('400 Bad Request');
  }

  const todosData = await readFile('./data.json', 'utf-8');
  const todos = JSON.parse(todosData);

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
}

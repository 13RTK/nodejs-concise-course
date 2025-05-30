import client from '../src/utils/dbHelper';

export async function getAllTodos() {
  const result = await client.query('SELECT * FROM todos');

  return result.rows;
}

export async function getTodoById(todoId) {
  const result = await client.query('SELECT * FROM todos WHERE id = $1', [
    todoId,
  ]);

  return result.rows[0];
}

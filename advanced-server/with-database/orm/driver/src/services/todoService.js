import client from '../utils/dbHelper.js';

export async function getAllTodos() {
  const result = await client.query('SELECT * FROM todo');

  return result.rows;
}

export async function getTodoById(todoId) {
  const result = await client.query('SELECT * FROM todo WHERE id = $1', [
    todoId,
  ]);

  return result.rows[0];
}

export async function deleteTodoById(todoId) {
  await client.query('DELETE FROM todo WHERE id = $1', [todoId]);
}

export async function createTodo(addTodo) {
  const result = await client.query(
    'INSERT INTO todo(id, title, tag, content) VALUES($1, $2, $3, $4) RETURNING *',
    [addTodo.id, addTodo.title, addTodo.tag, addTodo.content]
  );

  return result.rows[0];
}

export async function updateTodo(updateTodo) {
  const { id, ...updateData } = updateTodo;
  const columns = Object.keys(updateData);
  const values = Object.values(updateData);
  const setColumns = columns.map(
    (column, index) => `${column} = $${index + 1}`
  );
  const query = `UPDATE todo SET ${setColumns.join(',')} WHERE id = $${
    values.length + 1
  } RETURNING *`;
  const result = await client.query(query, [...values, id]);

  return result.rows[0];
}

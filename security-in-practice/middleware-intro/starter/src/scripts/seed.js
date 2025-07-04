import { readFile } from 'node:fs/promises';
import sequelize from '../utils/dbHelper.js';
import Todo from '../models/todoModel.js';

try {
  // Read initialize data
  const initializeTodosString = await readFile(
    './src/scripts/data/initData.json',
    'utf-8'
  );
  const initializeTodos = JSON.parse(initializeTodosString);

  // The connection test moved to dbHelper
  // Test connection
  // await sequelize.authenticate();

  // Sync database
  await Todo.sync({ force: true });

  // Insert data
  const todos = await Todo.bulkCreate(initializeTodos);
  console.log(JSON.stringify(todos, null, 2));
} catch (error) {
  console.log(error.message);
} finally {
  sequelize.close();
}

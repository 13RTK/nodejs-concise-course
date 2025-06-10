import { DataTypes } from 'sequelize';

import sequelize from '../utils/dbHelper.js';

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'todo',
    createdAt: false,
    updatedAt: false,
  }
);

export default Todo;

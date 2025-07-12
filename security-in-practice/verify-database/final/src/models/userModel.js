import { DataTypes } from 'sequelize';

import sequelize from '../utils/dbHelper.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: [8, 100],
      },
    },
  },
  {
    tableName: 'tb_user',
    createdAt: false,
    updatedAt: false,
  }
);

export default User;

import { DataTypes } from 'sequelize';
import sequelize from '../utils/dbHelper.js';

const URLRecord = sequelize.define(
  'URLRecord',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    // Model attributes are defined here
    originURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'url_record',
  }
);

export default URLRecord;

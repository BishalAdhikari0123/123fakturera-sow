import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Terms = sequelize.define('Terms', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Terms;
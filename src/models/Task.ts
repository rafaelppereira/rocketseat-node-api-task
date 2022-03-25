import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface TaskIntance extends Model {
  id: number;
  title: string;
  done: boolean;
}

export const Task = sequelize.define<TaskIntance>('Task', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'tasks',
  timestamps: false,
});
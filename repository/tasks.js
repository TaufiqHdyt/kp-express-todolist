import dbPool from '../utils/db.js';

export const getData = () => {
  const sql = 'SELECT task_id, task_name, is_completed, t.created_at, u.name person FROM tasks t JOIN users u on u.user_id = t.user_id';
  const result = dbPool.query(sql);

  return result;
};

export const getDataById = (id) => {
  const sql = 'SELECT task_id, task_name, is_completed, created_at FROM tasks WHERE task_id = ?';
  const result = dbPool.query(sql, [id]);

  return result;
};

export const createData = (name, user, completed = false) => {
  let createdAt = new Date();
  const sql = 'INSERT INTO tasks (task_name, user_id, is_completed, created_at) VALUE(?, ?, ?, ?)';
  const value = [name, user, completed ? 1 : 0, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (name, completed, id) => {
  let updatedAt = new Date();
  const sql = 'UPDATE tasks SET name = ?, is_completed = ?, updated_at = ? WHERE task_id = ?';
  const value = [name, completed, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteData = (id) => {
  const sql = 'DELETE FROM tasks WHERE task_id = ?';
  const value = [id];

  return dbPool.query(sql, value);
};

import dbPool from '../utils/db.js';

export const getData = () => {
  const sql = 'SELECT user_id, name, email, created_at FROM users';
  const result = dbPool.query(sql);

  return result;
};

export const getDataById = (id) => {
  const sql = 'SELECT user_id, name, email, created_at FROM users WHERE user_id = ?';
  const result = dbPool.query(sql, [id]);

  return result;
};

export const getDataByEmail = (email) => {
  const sql = 'SELECT user_id, name, email, password, created_at FROM users WHERE email = ?';
  const result = dbPool.query(sql, [email]);

  return result;
}

export const createData = (name, email, password) => {
  let createdAt = new Date();
  const sql = 'INSERT INTO users (name, email, password, created_at) VALUE(?, ?, ?, ?)';
  const value = [name, email, password, createdAt];

  return dbPool.query(sql, value);
};

export const updateData = (name, email, id) => {
  let updatedAt = new Date();
  const sql = 'UPDATE users SET name = ?, email = ?, updated_at = ? WHERE user_id = ?';
  const value = [name, email, updatedAt, id];

  return dbPool.query(sql, value);
};

export const deleteData = (id) => {
  const sql = 'DELETE FROM users WHERE user_id = ?';
  const value = [id];

  return dbPool.query(sql, value);
};

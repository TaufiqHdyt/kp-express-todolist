import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kelascom',
  socketPath: '/tmp/mysql.sock',
});

export default dbPool;

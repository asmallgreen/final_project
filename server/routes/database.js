import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'final_project',
  connectionLimit: 10,
});

//執行SQL語法
const executeQuery = async (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
export { executeQuery };
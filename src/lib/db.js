import mysql from 'mysql2/promise';

export async function query(q, params) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hotel_db',
  });

  const [results] = await connection.execute(q, params);
  connection.end();
  return results;
}

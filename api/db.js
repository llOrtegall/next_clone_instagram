import mysql from 'mysql2';
import dotenv from 'dotenv'

dotenv.config();

const dataBase = mysql.createConnection({
  host: process.env.SERVER_MSQL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBNAME,
})

dataBase.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión a la base de datos establecida');
  }
})

export default dataBase;
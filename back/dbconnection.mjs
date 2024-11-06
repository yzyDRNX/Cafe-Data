import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // tu usuario
  password: '', // tu contraseña
  database: 'Cafe'
});

connection.connect(err => {
  if (err) {
    console.error('Error en la conexión a la base de datos: ', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

export default connection;

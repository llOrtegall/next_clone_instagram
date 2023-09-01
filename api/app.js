import express from 'express';
import dataBase from './db.js'

const app = express();
const PORT = 4040;

app.get('/test', (req, res) => {
  dataBase.query('SELECT * FROM users', (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor API en ejecución en http://localhost:${PORT}`);
});
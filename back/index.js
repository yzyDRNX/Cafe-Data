import app from './app.js'; // Importamos la aplicación

const port = 3000; // Puerto en el que correrá el servidor

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

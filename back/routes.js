import express from 'express';
import connect from './dbconnection.mjs';

const router = express.Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const connection = await connect();
    const [productos] = await connection.execute('SELECT * FROM producto');
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

// Agregar producto al carrito
router.post('/carrito', async (req, res) => {
  const { id_usuario, p_id, cantidad } = req.body;
  try {
    const connection = await connect();
    await connection.execute('INSERT INTO carrito_compras (id_usuario, p_id, cantidad) VALUES (?, ?, ?)', [id_usuario, p_id, cantidad]);
    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).send('Error al agregar al carrito');
  }
});

// Obtener los productos del carrito
router.get('/carrito/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const connection = await connect();
    const [carrito] = await connection.execute('SELECT * FROM carrito_compras WHERE id_usuario = ?', [id_usuario]);
    res.json(carrito);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send('Error al obtener el carrito');
  }
});

// Eliminar producto del carrito
router.delete('/carrito/:id_carrito', async (req, res) => {
  const { id_carrito } = req.params;
  try {
    const connection = await connect();
    await connection.execute('DELETE FROM carrito_compras WHERE id_carrito = ?', [id_carrito]);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).send('Error al eliminar del carrito');
  }
});

export default router;

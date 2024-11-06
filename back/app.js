import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mysql from 'mysql2';
import expressParser from 'express';  // Usando express.json() en vez de body-parser


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Crear una conexión con la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Tu usuario de MySQL
    password: '',  // Tu contraseña de MySQL
    database: 'Cafe'  // El nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());  // Reemplazamos body-parser por express.json()
app.use(express.static(path.join(__dirname, '..', 'public')));

// Endpoint para el login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Verificar que el email y la contraseña estén presentes
    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar el usuario en la base de datos por el correo electrónico
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Comparar la contraseña ingresada con la almacenada en la base de datos (sin encriptación)
        if (user.contraseña !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, redirigir o enviar un mensaje de éxito
        res.status(200).json({ message: 'Login exitoso', userId: user.id_usuario });
    });
});

// Ruta para manejar el registro
app.post('/registro', (req, res) => {
    const { nombre_usuario, email, password } = req.body;

    // Comprobar si el correo electrónico ya está en uso
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
        }

        // Insertar el nuevo usuario en la base de datos (sin encriptar la contraseña)
        db.query(
            'INSERT INTO usuarios (nombre_usuario, email, contraseña) VALUES (?, ?, ?)',
            [nombre_usuario, email, password],  // Guardamos la contraseña en texto claro
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }

                res.status(201).json({ message: 'Usuario registrado exitosamente' });
            }
        );
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});

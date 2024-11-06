const express = require('express');
const Router = express.Router();
const db = require("../dbconnection");

// Mostrar formulario para agregar producto
Router.get('/addProduct', (req, res) => {
    const sql = "SELECT * FROM category";
    db.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('addProduct', { rows: rows });
    });
});

// Agregar producto
Router.post("/addProduct", (req, res) => {
    const { name, price, id_spct } = req.body;
    const query = "INSERT INTO product (name_p, price, category) VALUES (?, ?, ?)";
    db.query(query, [name, price, id_spct], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

// Editar producto
Router.get("/editProduct/:idProduct", (req, res) => {
    const idProduct = req.params.idProduct;
    const sql = "SELECT * FROM category";
    db.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('editProduct', {
            idp: idProduct,
            rows: rows
        });
    });
});

Router.post("/editProduct/:idProduct", (req, res) => {
    const idProduct = req.params.idProduct;
    const { name, price, id_spct } = req.body;
    const query = "UPDATE product SET name_p = ?, price = ?, category = ? WHERE idp = ?";
    db.query(query, [name, price, id_spct, idProduct], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

// Eliminar producto
Router.get("/deleteProduct/:idProduct", (req, res) => {
    const idProduct = req.params.idProduct;
    const query = 'DELETE FROM product WHERE idp = ?';
    db.query(query, [idProduct], (err, result) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

module.exports = Router;

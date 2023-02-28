import productManager from "./productManager.js"
import { query, urlencoded } from "express";
import fs from "fs"
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let data = require('./data.json')

import express from "express"



const app = express();

const PORT = 8080;
const manager = new productManager(data);

app.use(express.urlencoded( { extended: true} ));

app.get("/", async(req, res) => {
    res.send("express running");
    if (!manager.getAllProducts()) {
        await manager.cargarArchivo();
    };
});

app.get("/products", async (req, res) => {

    if (!manager.getAllProducts()) {
        await manager.cargarArchivo();
    }

    const products = await manager.getAllProducts(); 
    if (products.length>0) {
        const { limit } = req.query;
        let data;
        if ( !limit ) {
            data = products;
        } else { products.slice(0, parseInt(limit)); }
        res.send(data);
    } else {
        res.send ("no hay productos en el archivo")
    }
});

app.get ("/products/:pid", async (req, res) => {
    if (!manager.checkProduct()) {
        await manager.cargarArchivo();
    }
    const product = await manager.getProductById(parseInt(req.params.pid));
    JSON.stringify(product);

    if (product.id === undefined) {
        res.send ("No se encontró el producto");
        
    } else {
        res.send (`Producto: ${product.title}, descripción: ${product.description}, Precio: $${product.price}`)
    }
});

app.listen(PORT, () => {
    console.log (`server on port ${PORT}`);
});
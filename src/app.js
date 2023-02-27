import productManager from "./productManager.ks"
import { urlencoded } from "express";
import fs from "fs"

const express = require("express");

const app = express();

const PORT = 8080;
const manager = new productManager("./src/data.json");

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
        let { limit } = req.query;
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

    if (product) {
        res-semd (`Producto: ${product.title} con la descripción: ${product.description} Precio: $${product.price}`)
    } else {
        res.send ("No se encontró el producto")
    }
});

app.listen(PORT, () => {
    console.log (`server on port ${PORT}`);
});
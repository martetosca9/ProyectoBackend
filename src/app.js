import express, {json} from "express";
import productManager from "../src/controllers/productManager.js";
import { CartManager } from "./controllers/CartManager.js";
import productsRouter from "../src/routes/products.routes.js";
import cartsRouter from "../src/routes/cart.routes.js";
import { query, urlencoded } from "express";
import fs from "fs";
import { createRequire } from 'node:module';

const manager = new productManager("./src/models/data.json");
const cartManager = new CartManager("./src/models/carts.json");

const app = express();
app.use(json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, () => {
    console.log("server listening on port 8080.");
});

export {manager, cartManager}

app.use((req, res, next) => {
    req.io = io;
    next();
});

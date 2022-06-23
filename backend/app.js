import express from "express";
import data from "./data.js";
import cors from 'cors'
const app = express();

app.use(cors())
app.get('/api/products', (req, res) => {
    res.json({ products: data.products });
})
app.get('/api/products/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    res.send(product);
})
const port = 5000;
app.listen(port, () => console.log("We are listening on port ", port))
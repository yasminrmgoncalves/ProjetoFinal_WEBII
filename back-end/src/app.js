const express = require('express');
const cors = require('cors');
const routerPedido = require('./routes/PedidoRouter');
const routerProduto = require('./routes/ProdutoRouter');
const routerLogin = require('./routes/LoginRouter');

const app = express();
app.use(cors());

app.use(express.json());

app.use(routerProduto);
app.use(routerPedido);
app.use(routerLogin);

module.exports = app;
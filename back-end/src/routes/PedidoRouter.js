const express = require('express');
const pedidoController = require('../controllers/PedidoController');
const router = express.Router();

// ROTA GET PEDIDOS
router.get('/pedidos', pedidoController.getAll);

// ROTA GET PEDIDO
router.get('/pedidos/:id', pedidoController.getOne);

//POST PEDIDO
router.post('/pedidos', pedidoController.postPedido);

//PUT PEDIDO
router.put('/pedidos/:id', pedidoController.putPedido);

//DELETE PEDIDO
router.delete('/pedidos/:id', pedidoController.deletePedido);

//GET DE PEDIDOS ITENS
router.get('/pedidos_item/:id', pedidoController.getPedidoDetalhadoPorId);

//POST PEDIDO ITEM
router.post('/pedidos_item', pedidoController.postPedidoItem);

//PUT DE PEDIDO ITEM
router.put('/pedidos_item/:id', pedidoController.putPedidoItem);

//DELETE PEDIDO ITEM
router.delete('/pedidos_item', pedidoController.deletePedidoItem);

//GET ULTIMO PEDIDO
router.get('/pedidos_ultimo', pedidoController.getUltimoPedido);

module.exports = router;
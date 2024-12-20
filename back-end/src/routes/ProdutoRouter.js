const express = require('express');
const produtoController = require('../controllers/ProdutoController');
const produtoMiddleware = require('../middlewares/produtoMiddleware');
const router = express.Router();

// ROTA GET PRODUTOS
router.get('/produtos', produtoController.getAll);

// ROTA GET PRODUTO
router.get('/produtos/:id', produtoController.getOne);

// ROTA GET PRODUTO FILTERED
router.get('/produtos_filter', produtoController.getFiltered);

//POST PRODUTO
router.post('/produtos', produtoController.postProduto);

//PUT PRODUTO
router.put('/produtos/:id', produtoController.putProduto);

//DELETE PRODUTO
router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;
const express = require('express');
const loginController = require('../controllers/LoginController');
const router = express.Router();

// ROTA LOGIN
router.get('/login', loginController.getOne);

module.exports = router;
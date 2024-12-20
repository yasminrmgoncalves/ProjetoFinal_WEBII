const { Produto } = require('../../models');
const { Op } = require('sequelize'); 

const getAll = async (_req, res) => {
    try {
        const produtos = await Produto.findAll();
        if (produtos.length === 0) {
            return res.status(204).json({ message: 'Nenhum produto encontrado' });
        }
        return res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produto' });
    }
};

const getFiltered = async (req, res) => {
    try {
        const { nome } = req.query;

        const where = {};
        if (nome) where.nome = { [Op.like]: `%${nome}%` };

        const produtos = await Produto.findAll({ where });
        return res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar produtos filtrados' });
    }
};

const postProduto = async (req, res) => {
    try {
        console.log("passou");
        const createdProduto = await Produto.create(req.body);
        console.log("passou");
        return res.status(201).json({ message: 'Produto cadastrado com sucesso!', produto: createdProduto });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao cadastrar produto' });
    }
};

const putProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Produto.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        const updatedProduto = await Produto.findByPk(id);
        return res.status(200).json(updatedProduto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
};

const deleteProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Produto.destroy({ where: { id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        return res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar produto' });
    }
};

module.exports = {
    getAll,
    getOne,
    getFiltered,
    postProduto,
    putProduto,
    deleteProduto,
};

const validateBody = (req, res, next) => {
    const { body } = req;

    if (!body.nome || body.nome.trim() === '') {
        return res.status(400).json({ message: 'O nome do produto é obrigatório' });
    }

    if (!body.descricao || body.descricao.trim() === '') {
        return res.status(400).json({ message: 'A descrição do produto é obrigatória' });
    }

    if (body.preco === undefined || body.preco === null || isNaN(Number(body.preco))) {
        return res.status(400).json({ message: 'O preço do produto é obrigatório e deve ser um número válido' });
    }

    if (body.quantidade_gramas === undefined || body.quantidade_gramas === null || isNaN(Number(body.quantidade_gramas))) {
        return res.status(400).json({ message: 'A quantidade em gramas do produto é obrigatória e deve ser um número válido' });
    }

    if (!body.foto_produto || body.foto_produto.trim() === '') {
        return res.status(400).json({ message: 'A inserção de foto no produto é obrigatória' });
    }

    next();
};

module.exports = {
    validateBody,
};

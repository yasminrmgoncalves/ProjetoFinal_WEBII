const { Atendente } = require('../../models');

const getOne = async (req, res) => {
    try {
        const { login, senha } = req.query;

        const where = {};
        if (login) where.login = login;
        if (senha) where.senha = senha;

        // Busca no banco de dados
        const login_atendente = await Atendente.findAll({ where });

        console.log(login_atendente);

        // Verifica se nenhum registro foi encontrado
        if (login_atendente.length === 0) {
            return res.status(404).json({ message: 'Atendente não cadastrado' });
        }

        // Se encontrado, retorna o primeiro registro
        return res.status(200).json(login_atendente[0]);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar atendente' });
    }
};

module.exports = {
    getOne,
};

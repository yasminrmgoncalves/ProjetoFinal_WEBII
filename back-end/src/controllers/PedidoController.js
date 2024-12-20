const { Pedido, PedidoItem, Produto } = require('../../models');

const getAll = async (_req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        if (pedidos.length === 0) {
            return res.status(204).json({ message: 'Nenhum pedido encontrado' });
        }
        return res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar pedido' });
    }
};

const postPedido = async (req, res) => {
    try {
        const createdPedido = await Pedido.create(req.body);
        return res.status(201).json({ message: 'Pedido cadastrado com sucesso!', pedido: createdPedido });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar pedido' });
    }
};

const putPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Pedido.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        const updatedPedido = await Pedido.findByPk(id);
        return res.status(200).json(updatedPedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
};

const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Pedido.destroy({ where: { id } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        return res.status(200).json({ message: 'Pedido cancelado com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar pedido' });
    }
};

const getPedidoDetalhadoPorId = async (req, res) => {
    const { id } = req.params; // Obtém o ID do pedido a partir dos parâmetros da URL
  
    try {
      const pedido = await Pedido.findOne({
        where: { id }, // Filtro para um pedido específico
        include: [
          {
            model: PedidoItem,
            as: 'itens', // Alias definido no modelo
            include: [
              {
                model: Produto,
                as: 'produto', // Alias definido no modelo PedidoItem
                attributes: ['id', 'nome', 'preco', 'foto'], // Campos que você deseja buscar de Produto
              },
            ],
          },
        ],
      });
  
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      res.status(200).json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o pedido' });
    }
  };

const postPedidoItem = async (req, res) => {
    try {
        const createdPedidoItem = await PedidoItem.create(req.body);
        return res.status(201).json({ message: 'Item do pedido cadastrado com sucesso!', pedidoItem: createdPedidoItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar item do pedido' });
    }
};

const putPedidoItem = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await PedidoItem.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        const updatedPedidoItem = await PedidoItem.findByPk(id);
        return res.status(200).json(updatedPedidoItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar pedido' });
    }
};

const deletePedidoItem = async (req, res) => {
    try {
        const { id_pedido, id_produto } = req.query;
        const deletedRows = await PedidoItem.destroy({ where: { id_pedido, id_produto } });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Item do pedido não encontrado' });
        }
        return res.status(200).json({ message: 'Produto removido com sucesso!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar item do pedido' });
    }
};

const getUltimoPedido = async (_req, res) => {
    try {
        const pedido = await Pedido.findOne({ order: [['id', 'DESC']] });
        if (!pedido) {
            return res.status(404).json({ message: 'Nenhum pedido encontrado' });
        }
        return res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar o último pedido' });
    }
};

module.exports = {
    getAll,
    getOne,
    postPedido,
    putPedido,
    deletePedido,
    postPedidoItem,
    deletePedidoItem,
    getPedidoDetalhadoPorId,
    putPedidoItem,
    getUltimoPedido,
};

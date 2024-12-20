const connection = require("./connection");

const getAll = async () => {
  const pedidos = await connection.execute("select * from tb_pedido");
  return pedidos[0];
};

const getOne = async (id) => {
  const pedido = await connection.execute(
    "select tp.* from tb_pedido tp left join tb_pedido_item tpi on tpi.id_pedido = tp.id where tp.id = ?",
    [id]
  );
  return pedido[0];
};

const postPedido = async (pedido) => {
    const data_criacao = new Date();
    const { atendente, cliente, status } = pedido;
    const createdPedido = await connection.execute(
      "insert into tb_pedido(data_criacao, atendente, cliente, status) values(?,?,?,?)",
      [data_criacao, atendente, cliente, status]
    );
    return createdPedido[0];
};

const putPedido = async(id_pedido,pedido) =>{
    const {status} = pedido;
    const updatedPedido = await connection.execute(
        "update tb_pedido set status = ? where id = ?", [status, id_pedido]
    );
    return updatedPedido[0];
}

const deletePedido = async (id) => {
    const status = 'Cancelado';
    const pedido = await connection.execute(
        "update tb_pedido set status = ? where id = ?", [status, id]
      );
      return pedido[0];
};

const postPedidoItem = async (pedido_item) => {
    const { id_pedido, id_produto, quantidade } = pedido_item;
    const createdPedidoItem = await connection.execute(
      "insert into tb_pedido_item(id_pedido, id_produto, quantidade) values(?,?,?)",
      [id_pedido, id_produto, quantidade]
    );
    return createdPedidoItem;
};

const deletePedidoItem = async (id_pedido, id_produto) => {
    const deletedPedidoItem = await connection.execute(
        "delete from tb_pedido_item where id_pedido = ? and id_produto = ?'",
        [id_pedido, id_produto]
      );
      return deletedPedidoItem;
};

module.exports = {
  getAll,
  getOne,
  postPedido,
  putPedido,
  deletePedido,
  postPedidoItem,
  deletePedidoItem,
};

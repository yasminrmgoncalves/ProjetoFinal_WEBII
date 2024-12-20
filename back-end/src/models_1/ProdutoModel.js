const connection = require("./connection");

const getAll = async () => {
  const pedidos = await connection.execute(
    "select * from tb_produto where ativo = true"
  );
  return pedidos[0];
};

const getOne = async (id) => {
  const pedido = await connection.execute(
    "select * from tb_produto where id = ?",
    [id]
  );
  return pedido[0];
};

const getFiltered = async (filters) => {
  const { nome, categoria, precoMin, precoMax } = filters;

  // Base da query SQL
  let query = "SELECT * FROM tb_produto WHERE 1=1";
  const queryParams = [];

  // Adicionando filtros dinamicamente
  if (nome) {
    query += " AND nome LIKE ?";
    queryParams.push(`%${nome}%`); // Busca parcial (LIKE)
  }

  if (categoria) {
    query += " AND categoria = ?";
    queryParams.push(categoria);
  }

  if (precoMin) {
    query += " AND preco >= ?";
    queryParams.push(precoMin);
  }

  if (precoMax) {
    query += " AND preco <= ?";
    queryParams.push(precoMax);
  }

  // Executa a query com os parâmetros
  const [results] = await connection.execute(query, queryParams);
  return results;
};


const postProduto = async (produto) => {
  const { nome, descricao, preco, quantidade_gramas, foto_produto } = produto;
  const createdProduto = await connection.execute(
    "insert into tb_produto(nome, descricao, preco, quantidade_gramas, foto_produto) values(?,?,?,?,?)",
    [nome, descricao, preco, quantidade_gramas, foto_produto]
  );
};

const putProduto = async (id, produto) => {
  const {nome, descricao, preco, quantidade_gramas, foto_produto} = produto;
  const updatedProduto = await connection.execute(
    "update tb_produto set nome = ?, descricao = ?, preco = ?, quantidade_gramas = ?, foto_produto = ? where id = ?",
    [nome, descricao, preco, quantidade_gramas, foto_produto, id]
  );
  return updatedProduto;
};

const deleteProduto = async (id) => {
  const deletedProduto = await connection.execute(
    "update tb_produto set ativo = false where id = ?",
    [id]
  );
  return deletedProduto;
};

module.exports = {
  getAll,
  getOne,
  getFiltered,
  postProduto,
  putProduto,
  deleteProduto,
};

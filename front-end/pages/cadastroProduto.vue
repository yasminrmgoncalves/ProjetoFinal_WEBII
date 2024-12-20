<template>
  <div>
    <header class="header">
      <div class="logo-container">
        <h1 class="title_marca">The Burger Box</h1>
        <img src="../files/images/burgericon.png" class="img_logo" alt="Logo" />
      </div>
      <nav>
        <ul class="link">
          <li>
            <NuxtLink class="link" to="/cadastroProduto">Cadastro de Produto</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/login">Sair</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Home</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <div class="search-container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar..."
          @keyup.enter="fetchFilteredProducts"
        />
        <button class="search-button" @click="fetchFilteredProducts">
          <img src="../files/images/search.png" />
        </button>
      </div>
    </div>

    <div class="container">
      <h1>Cadastro de Produto</h1>
      <hr class="title-separator" />


      <form @submit.prevent="cadastrarProduto" class="form-container">

        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="produto.nome" required />
        </div>

        <div class="form-group">
          <label for="descricao">Descricao:</label>
          <input
            type="text"
            id="descricao"
            v-model="produto.descricao"
            required
          />
        </div>

        <div class="form-group">
          <label for="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            v-model.number="produto.preco"
            step="0.01"
            required
          />
        </div>

        <div class="form-group">
          <label for="quantidade">Quantidade em Gramas:</label>
          <input
            type="number"
            id="quantidade"
            v-model.number="produto.qtd_gramas"
            step="0.01"
            required
          />
        </div>

        <div class="form-group">
          <label for="foto">Foto do produto (URL):</label>
          <input type="text" id="foto" v-model="produto.foto" required />
        </div>

        <div class="botoes">
          <button type="button" class="btn-excluir" @click="excluirProduto">
            Excluir
          </button>
          <button type="submit" class="btn-cadastrar">Cadastrar</button>
        </div>
      </form>
    </div>

    <footer class="footer">
      <h1 class="title_marca">The Burger Box</h1>
      <img src="../files/images/burgericon.png" class="img_logo" alt="Logo" />
    </footer>
  </div>
</template>

<script>
export default {
  name: "CadastroProduto",
  data() {
    return {
      produto: {
        id: null,
        nome: "",
        descricao: "",
        preco: 0,
        qtd_gramas: 0,
        foto: "",
      },
      searchQuery: "",
    };
  },
  methods: {
    async cadastrarProduto() {
      try {
        const isUpdate = !!this.produto.id;
        const url = isUpdate
          ? `http://localhost:8888/produtos/${this.produto.id}`
          : "http://localhost:8888/produtos";
        const method = isUpdate ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: this.produto.nome,
            descricao: this.produto.descricao,
            preco: this.produto.preco,
            qtd_gramas: this.produto.qtd_gramas,
            foto: this.produto.foto,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert(
            isUpdate
              ? "Produto atualizado com sucesso!"
              : "Produto cadastrado com sucesso!"
          );

          this.produto = {
            id: null,
            nome: "",
            descricao: "",
            preco: 0,
            qtd_gramas: 0,
            foto: "",
          };

          console.log("Resposta da API:", data);
        } else {
          const errorData = await response.json();
          console.error("Erro na API:", errorData);
          alert(
            isUpdate
              ? "Erro ao atualizar o produto. Verifique os dados e tente novamente!"
              : "Erro ao cadastrar o produto. Verifique os dados e tente novamente!"
          );
        }
      } catch (error) {
        console.error(
          isUpdate
            ? "Erro ao atualizar produto:"
            : "Erro ao cadastrar produto:",
          error
        );
        alert(
          isUpdate
            ? "Erro ao atualizar o produto. Verifique a conexão e tente novamente!"
            : "Erro ao cadastrar o produto. Verifique a conexão e tente novamente!"
        );
      }
    },

    async fetchFilteredProducts() {
      try {
        const response = await fetch(
          `http://localhost:8888/produtos/${this.searchQuery}`
        );

        if (!response.ok) {
          throw new Error("Erro na requisição");
        }

        const data = await response.json();

        
        this.produto = {
          id: data.id || "",
          nome: data.nome || "",
          descricao: data.descricao || "",
          preco: data.preco || 0,
          qtd_gramas: data.qtd_gramas || 0,
          foto: data.foto || "",
        };

        alert("Dados carregados com sucesso!");
      } catch (error) {
        console.error("Erro ao buscar produtos filtrados:", error);
        alert("Produto não encontrado ou erro na pesquisa!");
      }
    },

    async excluirProduto() {
      if (!this.produto.id) {
        alert("O produto ainda não foi cadastrado!");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8888/produtos/${this.produto.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Produto excluído com sucesso!");

          this.produto = {
            id: null,
            nome: "",
            descricao: "",
            preco: 0,
            qtd_gramas: 0,
            foto: "",
          };
        } else {
          const errorData = await response.json();
          console.error("Erro ao excluir produto:", errorData);
          alert("Erro ao excluir o produto. Tente novamente!");
        }
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert(
          "Erro ao excluir o produto. Verifique a conexão e tente novamente!"
        );
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oi&display=swap");
.header,
.footer {
  background: #d43f3a;
  color: #ffffff;
  text-align: center;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title_marca {
  margin-left: 1rem;
  font-size: 1.5rem;
  font-family: "Oi", serif;
  font-weight: 400;
  font-style: normal;
  color: #f2b138;
}

.img_logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}

.link{
  color: white;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-decoration: none; 
  cursor: pointer;    
}

.search-container {
  display: flex;
  justify-content: center;
}

.search-bar {
  margin: 10px 0;
}

.search-button {
  background-color: white;
}

.search-button img {
  width: 20px;
  height: 20px;
}

.search-container input {
  padding: 8px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.container {
  width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Título */
h1 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
}

.title-separator {
  border: none;
  height: 3px;
  background-color: red;
  margin-bottom: 20px;
}

/* Formulário */
.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="file"] {
  padding: 4px;
}

span {
  display: block;
  margin-top: 5px;
  font-size: 14px;
  color: #555;
}

/* Botão */
.btn-cadastrar {
  background-color: #f0a500;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-cadastrar:hover {
  background-color: #d28c00;
}

.btn-excluir {
  background-color: #bf2626;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-excluir:hover {
  background-color: #d28c00;
}

.botoes {
  display: flex;
  justify-content: space-between;
}
</style>

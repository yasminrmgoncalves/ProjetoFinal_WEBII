<template>
  <div>
    <header class="header">
      <div class="logo-container">
        <h1 class="title_marca">The Burger Box</h1>
        <img
          src="../../files/images/burgericon.png"
          class="img_logo"
          alt="Logo"
        />
      </div>
      <nav>
        <ul class="link">
          <li>
            <NuxtLink class="link" to="/cadastroProduto"
              >Cadastro de Produto</NuxtLink
            >
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
    <div class="card-container">
      <div class="back-icon" @click="voltarPagina">
        <img src="../../files/images/seta-esquerda.png" />
      </div>

      <div class="content" v-if="product">
        <h1 class="title">{{ product.nome }}</h1>

        <div class="image-container">
          <img :src="product.foto" :alt="product.titulo" class="burger-image" />
        </div>

        <p class="description">Descrição: {{ product.descricao }}</p>

        <div class="price">
          <strong>R$ {{ product.preco.toFixed(2) }}</strong>
        </div>
      </div>

      <div v-else>
        <p>Carregando produto...</p>
      </div>
    </div>
    <footer class="footer">
      <h1 class="title_marca">The Burger Box</h1>
      <img
        src="../../files/images/burgericon.png"
        class="img_logo"
        alt="Logo"
      />
    </footer>
  </div>
</template>

<script>
export default {
  name: "ProdutoId",
  data() {
    return {
      product: null,
    };
  },
  methods: {
    voltarPagina() {
      window.history.back();
    },
    fetchProduct() {
      const productId = this.$route.params.id;
      fetch(`http://localhost:8888/produtos/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar produto");
          }
          return response.json();
        })
        .then((data) => {
          this.product = data;
        })
        .catch((error) => {
          console.error("Erro ao buscar produto:", error);
          alert("Não foi possível carregar as informações do produto.");
        });
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oi&family=Outfit:wght@100..900&display=swap");
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

.link {
  color: white;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-decoration: none;
  cursor: pointer;
}

.card-container {
  background-color: #f7931e;
  border-radius: 8px;
  width: 350px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  color: #000;
  text-align: center;
  position: relative;
}

.back-icon img {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
  font-size: 20px;
  width: 30px;
}

.back-icon:hover {
  color: #000;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.image-container {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.burger-image {
  width: 500px;
  height: auto;
  border-radius: 8px;
}

.description {
  font-size: 14px;
  margin: 10px 0;
  line-height: 1.5;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.price {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  color: #000;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>

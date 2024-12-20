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
      <div class="finalize-button">
        <button @click="finalizeOrder">Finalizar</button>
      </div>
    </div>

    <div class="products-grid">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product-item"
      >
        <input
          type="checkbox"
          v-model="selectedProducts"
          :value="product.nome"
        />
        <img :src="product.foto" :alt="product.nome" class="image_product" />
        <p>{{ product.nome }}</p>

        <div class="quantity">
          <button @click="decrement(index)">-</button>
          <span>{{ product.quantidade }}</span>
          <button @click="increment(index)">+</button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <h1 class="title_marca">The Burger Box</h1>
      <img src="../files/images/burgericon.png" class="img_logo" alt="Logo" />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", 
      selectedProducts: [], 
      products: [], 
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:8888/produtos");
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        this.products = data.map((product) => ({
          ...product,
          quantidade: 0,
        }));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao carregar produtos!");
      }
    },

    async fetchFilteredProducts() {
      try {
        const response = await fetch(
          `http://localhost:8888/produtos_filter?nome=${this.searchQuery}`
        );
        if (!response.ok) throw new Error("Erro na requisição");
        const data = await response.json();
        this.products = data.map((product) => ({
          ...product,
          quantidade: 0, 
        }));
      } catch (error) {
        console.error("Erro ao buscar produtos filtrados:", error);
        alert("Produto não encontrado ou erro na pesquisa!");
      }
    },

    increment(index) {
      this.products[index].quantidade++;
    },

    decrement(index) {
      if (this.products[index].quantidade > 0) {
        this.products[index].quantidade--;
      }
    },


    async finalizeOrder() {
      const selected = this.products.filter((product) =>
        this.selectedProducts.includes(product.nome)
      );

      const selectedData = selected.map((product) => ({
        id: product.id,
        quantidade: product.quantidade,
      }));

      try {
        const lastPedidoResponse = await fetch(
          "http://localhost:8888/pedidos_ultimo"
        );
        if (!lastPedidoResponse.ok)
          throw new Error("Erro ao buscar último pedido");

        const lastPedido = await lastPedidoResponse.json();

        if (!lastPedido || typeof lastPedido.id !== "number") {
          throw new Error("Formato inesperado na resposta do último pedido");
        }


        const pedidoId = lastPedido.id; 

        for (const item of selectedData) {
          await fetch("http://localhost:8888/pedidos_item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_pedido: pedidoId,
              id_produto: item.id,
              quantidade: item.quantidade,
            }),
          });
        }
        localStorage.setItem("idPedido", pedidoId.toString());
        alert("Pedido finalizado com sucesso!");
        this.$router.push("/pedidoFinal");
      } catch (error) {
        console.error("Erro ao finalizar pedido:", error);
        alert("Erro ao finalizar pedido! Tente novamente.");
      }
    },
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

.link{
  color: white;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-decoration: none; 
  cursor: pointer;    
}

.img_logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}

.search-container {
  display: flex;
  justify-content: center;
  width: auto;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-item {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.product-item img {
  width: 100px;
  height: 100px;
}

.image_product {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.quantity button {
  border: none;
  background-color: #bf2626;
  color: white;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.finalize-button {
  margin-top: 20px;
}

.finalize-button button {
  background-color: #f29e38;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.finalize-button button:hover {
  background-color: #c43225;
}
</style>

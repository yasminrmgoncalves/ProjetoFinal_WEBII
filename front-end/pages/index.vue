<template>
  <div class="homepage">
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
        </ul>
      </nav>
    </header>

    <main class="main-content">
      <button class="order-button" @click="startOrder">Iniciar Pedido</button>

      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-item">
          <img :src="product.foto" :alt="product.nome" class="product-image" />
          <p class="product-name">{{ product.nome }}</p>
          <button class="info-button" @click="viewInfo(product)">i</button>
        </div>
      </div>
    </main>

    <footer class="footer">
      <h1 class="title_marca">The Burger Box</h1>
      <img src="../files/images/burgericon.png" class="img_logo" alt="Logo" />
    </footer>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  data() {
    return {
      products: [], 
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:8888/produtos"); 
        if (response.ok) {
          const data = await response.json();
          this.products = data; 
        } else {
          console.error("Erro ao buscar produtos:", response.status);
        }
      } catch (error) {
        console.error("Erro ao conectar à API:", error);
      }
    },
    async startOrder() {
      const atendenteId = localStorage.getItem("atendente_id");
      if (!atendenteId) {
        alert("Erro: ID do atendente não encontrado no localStorage.");
        return;
      }
      const orderData = {
        id_atendente: 1,
        cliente: "teste",
        status: "em andamento",
      };

      try {
        const response = await fetch("http://localhost:8888/pedidos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          this.$router.push("/pedidoSelecao");
        } else {
          console.error("Erro ao iniciar pedido:", response.status);
          alert("Erro ao iniciar pedido. Por favor, tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao conectar à API:", error);
        alert("Erro ao iniciar pedido. Por favor, tente novamente.");
      }
    },
    viewInfo(product) {
      this.$router.push(`/produto/${product.id}`);
    },
  },
  mounted() {
    this.fetchProducts(); 
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Oi&family=Outfit:wght@100..900&display=swap");

.homepage {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background: #ffffff;
}

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

.logo-container {
  display: flex;
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

.main-content {
  text-align: center;
  width: 100%;
  padding: 2rem;
}

.order-button {
  padding: 0.75rem 1.5rem;
  background: #f29e38;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
}

.order-button:hover {
  background: #e5941f;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.product-item {
  text-align: center;
}

.product-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-name {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.info-button {
  background: #d43f3a;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.info-button:hover {
  background: #c02d29;
}
</style>

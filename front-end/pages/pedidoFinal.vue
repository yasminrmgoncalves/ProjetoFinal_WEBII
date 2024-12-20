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

    <main>
      <ul class="order-list" v-if="selectedProducts.length">
        <li v-for="item in selectedProducts" :key="item.id" class="order-item">
          <img :src="item.foto" :alt="item.nome" class="image_product" />
          <div class="item-info">
            <p>{{ item.nome }}</p>
            <p>x{{ item.quantidade }}</p>
            <p>
              R$
              {{
                (item.quantidade * parseFloat(item.preco))
                  .toFixed(2)
                  .replace(".", ",")
              }}
            </p>
          </div>
          <button @click="removeItem(item.id)" class="delete-button">🗑️</button>
        </li>
      </ul>
      <div v-else>
        <p>Nenhum produto selecionado.</p>
      </div>

      <div class="order-summary" v-if="selectedProducts.length">
        <p>Total: {{ total }}</p>
        <div class="client-info">
          <label for="client">Cliente:</label>
          <input
            type="text"
            id="client"
            v-model="clientName"
            placeholder="Nome do cliente"
          />
        </div>
        <div class="botoes">
        <button @click="cancelOrder" class="finalize-button">
          Cancelar Pedido
        </button>

        <button @click="finalizeOrder" class="finalize-button">
          Finalizar Pedido
        </button>
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
  data() {
    return {
      clientName: "",
      selectedProducts: [], 
      pedidoId: null, 
    };
  },
  async created() {
   
    try {
      const idPedido = localStorage.getItem("idPedido");
      if (!idPedido) throw new Error("idPedido não encontrado no localStorage");

      const response = await fetch(
        `http://localhost:8888/pedidos_item/${idPedido}`
      );
      if (!response.ok) throw new Error("Erro ao buscar pedido");

      const data = await response.json();

      this.pedidoId = data.id;
      this.clientName = data.cliente;
      this.selectedProducts = data.itens.map((item) => ({
        id: item.produto.id,
        nome: item.produto.nome,
        preco: item.produto.preco,
        quantidade: item.quantidade,
        foto: item.produto.foto, 
      }));
    } catch (error) {
      console.error("Erro ao carregar dados do pedido:", error);
      alert("Erro ao carregar dados do pedido!");
    }
  },

  computed: {
    total() {
      const totalValue = this.selectedProducts.reduce((sum, item) => {
        const price = parseFloat(item.preco) || 0;
        const quantity = parseInt(item.quantidade, 10) || 0;
        return sum + price * quantity;
      }, 0);
      return totalValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
  methods: {
    removeItem(itemId) {
      fetch(
        `http://localhost:8888/pedidos_item?id_pedido=${this.pedidoId}&id_produto=${itemId}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao deletar o item");
          }
          
          this.selectedProducts = this.selectedProducts.filter(
            (item) => item.id !== itemId
          );
        })
        .catch((error) => {
          console.error("Erro ao remover item:", error);
          alert("Não foi possível remover o item. Tente novamente.");
        });
    },

    finalizeOrder() {
      if (!this.pedidoId) {
        alert("Pedido inválido.");
        return;
      }

      const updatedOrder = {
        cliente: this.clientName,
        status: "Finalizado",
      };

      fetch(`http://localhost:8888/pedidos/${this.pedidoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao finalizar o pedido.");
          }
          alert(
            `Pedido #${this.pedidoId} finalizado com sucesso para o cliente: ${this.clientName}`
          );
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erro ao finalizar pedido:", error);
          alert("Não foi possível finalizar o pedido. Tente novamente.");
        });
    },
    cancelOrder(){
      if (!this.pedidoId) {
        alert("Pedido inválido.");
        return;
      }

      fetch(`http://localhost:8888/pedidos/${this.pedidoId}`, {
        method: "DELETE"
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao deletar pedido.");
          }
          alert(
            `Pedido #${this.pedidoId} cancelado com sucesso.`
          );
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erro ao cancelar pedido:", error);
          alert("Não foi possível cancelar o pedido. Tente novamente.");
        });
    },
  },
};
</script>
<style>
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

.order-list {
  list-style-type: none;
  padding: 0;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.image_product {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-info {
  flex: 1;
  margin-left: 10px;
}

.delete-button {
  background: none;
  border: none;
  color: red;
  font-size: 20px;
  cursor: pointer;
}

.order-summary {
  margin-top: 20px;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.order-summary input {
  width: 400px;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.client-info {
  margin: 10px 0;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.botoes {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
}

.finalize-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}
.finalize-button:hover {
  background-color: #d32f2f;
}
</style>

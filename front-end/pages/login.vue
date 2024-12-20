<template>
  <div class="container">
    <div class="login-box">
      <div class="header">
        <h1 class="title_marca">The Burger Box</h1>
        <img src="../files/images/burgericon.png" class="img_logo" alt="Logo" />
      </div>
      <form @submit.prevent="handleLogin">
        <label for="login">Login:</label>
        <input type="text" id="login" name="login" v-model="login"  />

        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" v-model="senha" />

        <button type="submit">Entrar</button>
      </form>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "LoginScreen",
  data() {
    return {
      login: "",
      senha: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const query = new URLSearchParams({
          login: this.login,
          senha: this.senha,
        }).toString();

        const response = await fetch(`http://localhost:8888/login?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const data = await response.json(); 
          if (data && data.atendente_id) {
            localStorage.setItem("atendente_id", data.atendente_id); 
          }
          alert("Login bem-sucedido!");
          this.$router.push("/"); 
        } else {
          alert("Erro ao logar!");
        }
      } catch (error) {
        console.log(error);
        alert("Erro ao conectar à API. Tente novamente.") ;
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oi&family=Outfit:wght@100..900&display=swap");
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #ffffff;
  position: relative;
}

.container::before,
.container::after {
  content: "";
  position: absolute;
  width: 200px;
  height: 200px;
  background: #f5a623;
  border-radius: 50%;
}

.container::before {
  top: -50px;
  right: -50px;
}

.container::after {
  bottom: -50px;
  left: -50px;
}

.login-box {
  background: #d43f3a;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  position: relative;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form label {
  text-align: center;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

form input {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
}

button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background: #f5a623;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  font-family: "Outfit", sans-serif;
  font-optical-sizing: auto;
}

button:hover {
  background: #e5941f;
}
</style>

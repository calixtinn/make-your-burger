<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div>
      <form id="burger-form" @submit.prevent="createBurger()">
        <div class="input-container">
          <label for="nome">Nome do cliente:</label>
          <!-- <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite seu nome"> -->
          <span class="p-input-icon-left">
            <InputText id="nome" name="nome" type="text" v-model="nome" placeholder="Digite seu nome" />
            <i class="pi pi-user" />
          </span>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão:</label>
          <select name="pao" id="pao" v-model="pao">
            <option value="">Selecione o seu pão:</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{pao.tipo}}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Selecione a carne:</label>
          <select name="carne" id="carne" v-model="carne">
            <option value="">Selecione o tipo de carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{carne.tipo}}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="carne">Selecione os opcionais:</label>
          <div v-for="opcional in opcionaisdata" :key="opcional.id" class="checkbox-container">
            <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
            <span>{{opcional.tipo}}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burger!">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import api from '@/services/api'

export default {
  name: 'BurgerForm',
  data() {
    return {
      nome: null,
      paes: null,
      carnes: null,
      opcionaisdata: null,
      pao: null,
      carne: null,
      opcionais: [],
      msg: null
    }
  },
  components: { Message },
  methods: {
    async getIngredientes() {

      // Exemplo de uso do axios para requisições

      await api.get('/ingredientes').then((response) => {
        this.paes = response.data.paes;
        this.carnes = response.data.carnes;
        this.opcionaisdata = response.data.opcionais;
      }).catch(error => {
        console.log(error);
      });

    },

    async createBurger() {
      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: Array.from(this.opcionais),
        status: 'Solicitado',
      }


      await api.post('/burgers', data).then((response) => {
        this.msg = `Pedido Nº ${response.data.id} realizado com sucesso!`;
        setTimeout(() => this.msg = "", 3000);
      }).catch(error => {
        console.log(error);
      });

      // Limpar os campos

      this.nome = '';
      this.carne = '';
      this.pao = '';
      this.opcionais = [];

    }
  },
  mounted() {
    this.getIngredientes();
  }
}
</script>

<style scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input, select {
  padding: 5px 10px;
  width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: .5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

/*.p-inputtext {*/
/*  background: white;*/
/*  color: black;*/
/*}*/

</style>

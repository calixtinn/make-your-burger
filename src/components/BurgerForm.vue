<template>
  <div>
    <Message :msg="msg" v-show="msg"/>
    <div>
      <form id="burger-form" @submit.prevent="createBurger()">
        <div class="input-container">
          <label for="nome">Nome do cliente:</label>
          <span id="input-text-span" class="p-input-icon-right">
            <InputText id="nome" name="nome" type="text" v-model="nome" placeholder="Digite seu nome" />
            <i class="pi pi-user" />
          </span>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão:</label>
          <Dropdown id="pao" name="pao" v-model="pao" :options="paes" optionLabel="tipo" optionValue="tipo" :filter="true"/>
        </div>
        <div class="input-container">
          <label for="carne">Selecione a carne:</label>
          <Dropdown id="carne" name="carne" v-model="carne" :options="carnes" optionLabel="tipo" optionValue="tipo" :filter="true"/>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="carne">Selecione os opcionais:</label>
          <div v-for="opcional in opcionaisdata" :key="opcional.id" class="checkbox-container">
            <Checkbox name="opcionais" :value="opcional.tipo" v-model="opcionais"/>
            <span>{{opcional.tipo}}</span>
          </div>
        </div>
        <div class="input-container">
          <Button type="submit" label="Criar meu Burger!" icon="pi pi-check" class="submit-btn" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import Message from './Message.vue';
import api from '@/services/api'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

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
  components: { Message, InputText, Dropdown, Checkbox, Button },
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

#input-text-span {
  width: 300px;
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

.p-dropdown {
  width: 300px;
}

.p-checkbox {
  margin-right: 5px;
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
  width: 300px;
}

.p-button:hover {
  background-color: transparent !important;
  color: #222 !important;
}

</style>

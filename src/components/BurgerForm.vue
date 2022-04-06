<template>
  <div>
    <Toast />
    <BlockUICustom :blockedScreen="blockedScreen"/>
    <div>
      <form id="burger-form" @submit.prevent="createBurger()">
        <div class="input-container">
          <label for="nome">Nome do cliente: *</label>
          <span id="input-text-span" class="p-input-icon-left">
            <InputText id="nome" name="nome" type="text" v-model="burger.nome" placeholder="Digite seu nome" />
            <i class="pi pi-user" />
          </span>
          <div v-for="error of v$.burger.nome.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão: *</label>
          <Dropdown id="pao" name="pao" v-model="burger.pao" :options="paesOptions" optionLabel="tipo" optionValue="tipo" :filter="true"/>
          <div v-for="error of v$.burger.pao.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div class="input-container">
          <label for="carne">Selecione a carne: *</label>
          <Dropdown id="carne" name="carne" v-model="burger.carne" :options="carnesOptions" optionLabel="tipo" optionValue="tipo" :filter="true"/>
          <div v-for="error of v$.burger.carne.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="carne">Selecione os opcionais:</label>
          <div v-for="opcional in opcionaisdata" :key="opcional.id" class="checkbox-container">
            <Checkbox name="opcionais" :value="opcional.tipo" v-model="burger.opcionais"/>
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

import ingredientesService from '@/services/ingredientes-service';
import burgerService from '@/services/burger-service';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import {ToastSeverity} from 'primevue/api';
import useValidate from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import BlockUICustom from './BlockUICustom.vue';

export default {
  name: 'BurgerForm',
  data() {
    return {
      v$: useValidate(),
      paesOptions: null,
      carnesOptions: null,
      opcionaisdata: null,
      burger: {
        nome: null,
        pao: null,
        carne: null,
        opcionais: [],
        status: 'Solicitado',
      },
      blockedScreen: false
    }
  },
  validations() {
    return {
      burger: {
        nome: { required },
        pao: { required },
        carne: { required }
      }
    }
  },
  components: { InputText, Dropdown, Checkbox, Button, BlockUICustom },
  methods: {
    async getIngredientes() {

      // Exemplo de uso do axios para requisições

      await ingredientesService.getAll().then((response) => {
        this.paesOptions = response.data.paes;
        this.carnesOptions = response.data.carnes;
        this.opcionaisdata = response.data.opcionais;
      }).catch(error => {
        console.log(error);
      });

    },

    async createBurger() {

      this.v$.$validate();
      if(!this.v$.$error) {
        this.blockedScreen = true;
        await burgerService.create(this.burger).then((response) => {
          this.$toast.add({severity:ToastSeverity.SUCCESS, summary: 'Sucesso', detail:`Pedido Nº ${response.data.id} realizado!`, life: 3000});
          this.$store.dispatch('alterarUltimoPedido', {nome: this.burger.nome, qtdeOpcionais: this.burger.opcionais.length});
          // Resetar o formulário
          this.v$.$reset();
          // Limpar os campos
          this.burger = {};
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          this.blockedScreen = false;
        });
        
        return;
      }
      this.$toast.add({severity: ToastSeverity.ERROR, summary: 'Erro', detail: 'Favor preencher os campos obrigatórios!', life: 3000});
      return;
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

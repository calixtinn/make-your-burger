<template>
  <div>
    <Toast />
    <BlockUICustom :blockedScreen="blockedScreen"/>
    <div>
      <form id="burger-form" @submit.prevent="createBurger()">
        <div class="input-container">
          <label for="nome">Nome do cliente: *</label>
          <span id="input-text-span" class="p-input-icon-left">
            <InputText id="nome" name="nome" type="text" v-model="state.burger.nome" placeholder="Digite seu nome" />
            <i class="pi pi-user" />
          </span>
          <div v-for="error of v$.burger.nome.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão: *</label>
          <Dropdown id="pao" name="pao" v-model="state.burger.pao" :options="paesOptions" optionLabel="tipo" optionValue="tipo" :filter="true"/>
          <div v-for="error of v$.burger.pao.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div class="input-container">
          <label for="carne">Selecione a carne: *</label>
          <Dropdown id="carne" name="carne" v-model="state.burger.carne" :options="carnesOptions" optionLabel="tipo" optionValue="tipo" :filter="true"/>
          <div v-for="error of v$.burger.carne.$errors" :key="error.$uid">
              <div class="error-msg">Campo Obrigatório</div>
          </div>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="carne">Selecione os opcionais:</label>
          <div v-for="opcional in opcionaisdata" :key="opcional.id" class="checkbox-container">
            <Checkbox name="opcionais" :value="opcional.tipo" v-model="state.burger.opcionais"/>
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
import BlockUICustom from './BlockUICustom.vue';

import {ToastSeverity} from 'primevue/api';
import { useToast } from "primevue/usetoast";
import useValidate from '@vuelidate/core';
import {required} from '@vuelidate/validators';
import { computed, onMounted, reactive, ref } from 'vue';

import { useStore } from 'vuex'

export default {
  name: 'BurgerForm',
  components: { InputText, Dropdown, Checkbox, Button, BlockUICustom },
  setup() {

    const toast = useToast();
    const store = useStore();

    const state = reactive({
      burger:{
        nome: '',
        pao: '',
        carne: '',
        opcionais: [],
        status: '',
      }
    })

    const rules = computed(() => {
      return {
        burger: {
          nome: { required },
          pao: { required },
          carne: { required }
        }
      };
    });

    const v$ = useValidate(rules, state);

    const alterarUltimoPedido = (nome, qtde) => store.dispatch('alterarUltimoPedido', {nome: nome, qtdeOpcionais: qtde});

    const paesOptions = ref(null);
    const carnesOptions = ref(null);
    const opcionaisdata = ref(null);
    const blockedScreen = ref(false);

    async function getIngredientes() {
      // Exemplo de uso do axios para requisições
      await ingredientesService.getAll().then((response) => {
        paesOptions.value = response.data.paes;
        carnesOptions.value = response.data.carnes;
        opcionaisdata.value = response.data.opcionais;
      }).catch(error => {
        console.log(error);
      });
    };

    async function createBurger() {
      v$.value.$validate();
      if(!v$.value.$error) {
        blockedScreen.value = true;
        state.burger.status = 'Solicitado';
        await burgerService.create(state.burger).then((response) => {
          toast.add({severity:ToastSeverity.SUCCESS, summary: 'Sucesso', detail:`Pedido Nº ${response.data.id} realizado!`, life: 3000});
          alterarUltimoPedido(state.burger.nome, state.burger.opcionais.length);
          // Resetar o formulário
          v$.value.$reset();
          // Limpar os campos
          state.burger = {};
        }).catch(error => {
          console.log(error);
        }).finally(() => {
          blockedScreen.value = false;
        });
        return;
      }
      toast.add({severity: ToastSeverity.ERROR, summary: 'Erro', detail: 'Favor preencher os campos obrigatórios!', life: 3000});
      return;
    }
    
    onMounted(() => {
      getIngredientes();
    })

    return {
      state,
      paesOptions,
      carnesOptions,
      opcionaisdata,
      blockedScreen,
      v$,
      getIngredientes,
      createBurger,
      alterarUltimoPedido
    }
  },
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

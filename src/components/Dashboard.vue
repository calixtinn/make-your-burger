<template>
  <div>
    <BlockUICustom :blockedScreen="blockedScreen"/>
    <Toast />
    <div class="ultimo-pedido" v-if="nomeUltimoPedido">
      <h2>Último pedido: {{nomeUltimoPedido}} | {{pediuOpcionais}}</h2>
    </div>
    <hr>
    <DataTable :value="burgers" responsiveLayout="scroll" :stripedRows="true" :paginator="true" :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,20]" currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros">
        <Column field="id" header="#"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="pao" header="Pão"></Column>
        <Column field="carne" header="Carne"></Column>
        <Column header="Opcionais">
          <template #body="pedido">
            <ul v-for="(opcional, index) in pedido.data.opcionais" :key="index">
                <li>{{opcional}}</li>
            </ul>
          </template>
        </Column>
        <Column header="Status">
          <template #body="pedido">
            <Dropdown id="status" name="status" v-model="pedido.data.status" :options="status" optionLabel="tipo" optionValue="tipo" @change="updateBurger($event, pedido.data.id)"/>
          </template>
        </Column>
        <Column :exportable="false">
          <template #body="pedido">
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteBurger(pedido.data.id)" v-tooltip="'Cancelar Pedido'"/>
          </template>
        </Column>
    </DataTable>
  </div>
</template>
<script>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Button from 'primevue/button';
  import Dropdown from 'primevue/dropdown';
  import api from '@/services/api'
  import BlockUICustom from './BlockUICustom.vue'


  export default {
    name: "Dashboard",
    components: {DataTable, Column, Button, Dropdown, BlockUICustom},
    data() {
      return {
        burgers: null,
        burger_id: null,
        status: [],
        // Obtendo os dados da Store
        nomeUltimoPedido: this.$store.state.usuarioUltimoPedido.nome,
        pediuOpcionais: this.$store.getters.escolheuOpcionais,
        blockedScreen: false
      }
    },
    methods: {
      async getPedidos() {
        this.blockedScreen = true;
        await api.get('/burgers').then((response) => {
          this.burgers = response.data;
        }).finally(() => {
          // Timeout adicionado apenas para fins de demonstração, pois a requisição é muito rápida.
          setTimeout(() => {
            this.blockedScreen = false;
          }, 1000)
        });
      },

      async getStatus() {
        
        await api.get('/status').then((response) => {
          this.status = response.data;
        });
      },

      async deleteBurger(id) {

        await api.delete(`/burgers/${id}`).then((response) => {
          this.$toast.add({severity: 'success', summary: 'Sucesso', detail:'Pedido deletado com sucesso', life:3000});
          this.getPedidos();
        });
      },

      async updateBurger(event, id) {

        await api.patch(`/burgers/${id}`, {status: event.value}).then((response) => {
          this.$toast.add({severity: 'success', summary: 'Sucesso', detail:'Status alterado com sucesso', life:3000});
          this.getPedidos();
        });
      },
    },
    mounted () {
      this.getPedidos();
      this.getStatus();
    }
  }
</script>

<style scoped>

.p-datatable {
  padding-top: 20px;
}

.ultimo-pedido {
  color: rgb(207, 12, 12);
  display: flex;
}

.ultimo-pedido h2 {
  padding-left: 5px;
}

</style>
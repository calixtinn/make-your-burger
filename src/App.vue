<template>
  <div>
    <Navbar :logo="logo_src" :alt="app_name"/>
    <div>
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>

  import { ref } from 'vue'
  import Navbar from "./components/Navbar.vue"
  import Footer from "./components/Footer.vue"
  export default {
    components: {
      Navbar, 
      Footer
    },
    setup() {

      const logo_src = ref('/img/logo.png');
      const app_name = ref('Make Your Burger');

      return {
        logo_src,
        app_name
      }
    }
  }
</script>

<style>

  /* Remoção de CSS a mais que vem com o navegador 
  Alterando a fonte do projeto, removendo o padding de todos os elementos, tirando a margem de todos os elementos,
  e o bix-sizing para border-box para que os inputs não passarem da div-pai
  */
  * {
    font-family: Helvetica;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .main-container {
    margin: 50px; /* Ajustar o conteúdo e dar mais espaçamento em todos os cantos */
    min-height: 250px; /* Ganha um "corpo" a mais, o conteúdo do site */
  }

  h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
  }

  /** Todos os dropdowns do projeto terão o highlight cinza */

  :root .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color: #ffffff !important;
    background: #808080 !important;
  }

  .error-msg {
    color: #ff0000;
    font-size: small;
    margin-top: 6px;
    padding-left: 12px;
}

</style>

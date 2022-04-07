<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <div>
            <span class="collapsed-icon" @click="alterarSidebar()" >
                <i class="pi pi-bars"></i>
            </span>
        </div>
        
        <div v-if="!collapsedSidebar">
            <router-link to="/" id="logo-url">
                <img :src="logo" :alt="alt" id="logo">
            </router-link>
            <h2 id="sys-name">Make Your Burger!</h2>
        </div>
        <div>
            <SidebarLink to="/" icon="pi pi-home">Home</SidebarLink>
            <SidebarLink to="/pedidos" icon="pi pi-shopping-cart">Pedidos</SidebarLink>
        </div>
    </div>
</template>


<script>
import { computed } from '@vue/runtime-core';
import {useStore} from 'vuex';
import SidebarLink from './SidebarLink.vue'
export default {
    name: 'Sidebar',
    props: ['logo', 'alt'],
    components: {
        SidebarLink
    },
    setup() {
        const store = useStore();

        const alterarSidebar = () => store.dispatch('alterarSidebar');
        
        return {
            collapsedSidebar: computed(() => store.state.collapsedSidebar),
            sidebarWidth: computed(() => store.getters.getSidebarWidth),
            alterarSidebar
        }
    },
}
</script>

<style>
:root {
  --sidebar-bg-color: #222;
  --sidebar-item-hover: rgb(65, 62, 62);
  --sidebar-item-active: #14120d;
}
</style>

<style scoped>
.sidebar {
  color: #fcba03;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.sidebar h1 {
  height: 2.5em;
}

.collapsed-icon {
  position: absolute;
  bottom: 0;
  padding: 0.4em;
  transition: 0.2s linear;
}

#logo {
    width: 100px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    display: block;
}

#logo-url{
    margin: auto;
    margin-left: 0;
}

#sys-name {
    text-align: center;
    margin-top: 20px;
}



</style>
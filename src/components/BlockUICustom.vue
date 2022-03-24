<template>
    <div>
        <div v-if="blockedScreen">
            <ProgressSpinner />
            <span class="mensagem-loading">Carregando...</span>
        </div>
        <BlockUI :fullScreen="true" :blocked="blockedScreen"></BlockUI>
    </div>
</template>

<script>

import ProgressSpinner from 'primevue/progressspinner';
import BlockUI from 'primevue/blockui';

export default {
    name: 'BlockUICustom',
    components: {
        ProgressSpinner, 
        BlockUI
    },
    props: {
        blockedScreen: Boolean
    }
}
</script>

<style>
    .p-progress-spinner {
        position: fixed;
        right: 50%;
        z-index: 99;
        bottom: 50%;
    }

    .mensagem-loading {
        position: fixed;
        right: 50%;
        z-index: 99;
        bottom: 45%;
        font-size: 18px;
        width: 100px;
        font-weight: bold;
    }
</style>
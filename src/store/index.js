import { createStore } from 'vuex';
import { ALTERAR_ULTIMO_PEDIDO, ALTERAR_SIDEBAR, ESCONDER_SIDEBAR } from './mutations-types';

const store = createStore({
    // State armazena as variáveis que serão compartilhadas com toda a aplicação
    state: {
        usuarioUltimoPedido: {
            nome: null,
            qtdeOpcionais: null
        },
        collapsedSidebar: false,
        sidebarWidth: 180,
        sidebarWidthCollapsed: 38
    },
    // Recebe states como parâmetro e podemos fazer quaisquer alterações
    getters: {
        escolheuOpcionais(state) {
            return state.usuarioUltimoPedido.qtdeOpcionais > 0 ? 'Com opcionais' : 'Sem opcionais';
        },
        getStatusSidebar(state) {
            return state.collapsedSidebar;
        },
        getSidebarWidth(state) {
            return `${state.collapsedSidebar ? state.sidebarWidthCollapsed : state.sidebarWidth}px`
        }
    },
    // Realiza alterações nas states. São síncronos!
    mutations: {
        // Métodos sempre com letra maiúscula para seguir o padrão Flux
        [ALTERAR_ULTIMO_PEDIDO](state, payload) {
            state.usuarioUltimoPedido.nome = payload.nome;
            state.usuarioUltimoPedido.qtdeOpcionais = payload.qtdeOpcionais;
        },
        [ALTERAR_SIDEBAR](state) {
            state.collapsedSidebar = !state.collapsedSidebar;
        },
        [ESCONDER_SIDEBAR](state) {
            state.collapsedSidebar = false;
        }
    },
    // Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
    // As ações podem conter operações assíncronas arbitrárias.
    // O correto é chamar as actions nos componentes, e não as mutations diretamente.
    actions: {
        alterarUltimoPedido({commit}, payload) {
            commit(ALTERAR_ULTIMO_PEDIDO, payload);
        },
        alterarSidebar({commit}) {
            commit(ALTERAR_SIDEBAR);
        },
        esconderSidebar({commit}) {
            commit(ESCONDER_SIDEBAR);
        }
    }
});

export default store;
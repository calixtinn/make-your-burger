import { createStore } from 'vuex';
import { ALTERAR_ULTIMO_PEDIDO } from './mutations-types';

const store = createStore({
    // State armazena as variáveis que serão compartilhadas com toda a aplicação
    state: {
        usuarioUltimoPedido: {
            nome: null,
            qtdeOpcionais: null
        }
    },
    // Recebe states como parâmetro e podemos fazer quaisquer alterações
    getters: {
        escolheuOpcionais(state) {
            return state.usuarioUltimoPedido.qtdeOpcionais > 0 ? 'Com opcionais' : 'Sem opcionais';
        }
    },
    // Realiza alterações nas states. São síncronos!
    mutations: {
        // Métodos sempre com letra maiúscula para seguir o padrão Flux
        [ALTERAR_ULTIMO_PEDIDO](state, payload) {
            state.usuarioUltimoPedido.nome = payload.nome;
            state.usuarioUltimoPedido.qtdeOpcionais = payload.qtdeOpcionais;
        }
    },
    // Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
    // As ações podem conter operações assíncronas arbitrárias.
    // O correto é chamar as actions nos componentes, e não as mutations diretamente.
    actions: {
        alterarUltimoPedido({commit}, payload) {
            commit(ALTERAR_ULTIMO_PEDIDO, payload);
        }
    }
});

export default store;
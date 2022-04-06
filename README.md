# Projeto estudo - Vue.js

## Instalação

É necessário ao menos o cli 4.5 para gerar projetos em Vue 3

```bash
curl -L https://nodejs.org/dist/v16.14.2/node-v16.14.2-linux-x64.tar.xz -o /tmp/node-v16.14.2-linux-x64.tar.xz
sudo tar -Jxvf /tmp/node-v16.14.2-linux-x64.tar.xz -C /opt/
sudo ln -s /opt/node-v16.14.2-linux-x64/bin/node /usr/bin/node16
sudo ln -s /opt/node-v16.14.2-linux-x64/bin/npm /usr/bin/npm16
sudo npm16 install -g @vue/cli
vue create projeto_vue


Instalação de componentes PrimeVue: https://www.youtube.com/watch?v=cGTXuyqIwMA&t=60s

```
## Estrutura de pastas:

- node_modules: Salvos pacoes, apps, dependências, que vão fazer com que o app vue execute

- public: Onde ficam os assets, arquivos estáticos da aplicação, e tem um HTML principal, onde há a inicialização do Vue, por meio de vue app

- src: Onde ficam os arquivos da aplicação

    - assets: Alguns arquivos estáticos da aplicação também
    - components: componentes da aplicação
    - App.vue: Arquivo principal, chama o próprio componente

- views: São inseridos componentes que representarão as views da aplicação. Para cada página teremos uma view, e cada view pode ter vários componentes

    - O App.vue estará presente em todas as views, pois estas estão abaixo dele. E as views serão renderizadas dentro da tag `<router-view />`. Se comporta como o router-outlet do Angular!

## Componentes

- É através dos componentes que poedmos dividir o nosso layout em partes
- Cada componente tem sua responsabilidade, por exemplo: um que é uma tabela, e outro que é um rodapé.
- Dividir as entidades dessa maneira deixa o projeto com uma separação de responsabilidades maior
- Cada um tendo o seu CSS e também os dados que manipula
- Tag `<template></template>` é a tag essencial para a criação de componentes. indica onde o HTML vai ficar.
- Os componentes podem conter dados, que podem ser inicializados com algum valor ou serem modificados durante a execução do programa. Os dados ficam em uma funçao chamada `data`, e essa função deve retornar os dados em formato de objeto (chave e valor)


## Life cycle Hooks

São eventos que podem ser ativados em determinadas partes da execução do programa, como por exemplo: `created`, que se assemelha ao ngOnInit do Angular. Executa o código a partir do momento que o componente é criado, e esses gatilhos são interessantes para alterar a aplicação em diversas etapas diferentes.

## Hierarquia de Componentes

É comum que componentes tenham outros componentes que dependam deles, ou seja, é criada uma árvore de componentes. Mas é necessário tomar cuidado para que não vire uma bagunça. Com essa divisão de componentes em subcomponentes, é possível separar mais ainda as responsabilidades de cada um dos componentes.

## Diretivas

Existem várias diretivas no vue. Como por exemplo v-if. Elas podem mudar a exibição de uma parte do layout, baseada em uma condição. As diretivas são essenciais para uma aplicação dinâmica. Pode-se alterar a lógica pelos valores inseridos em data.

## Argumentos

São valores dinâmicos que podem ser inseridos em: Diretivas, baseados nesses valores para executar um determinado comportamento. Atributos: mudar a URl de links ou src de imagens. Eles são essenciais para alterar a experiência do Usuário no uso da aplicação.

## Métodos

São como funções que podem ser executados baseados em eventos ou por alguma lógica da aplicação. Eles ficam em um objeto chamado `methods`, onde são criadas as funções que posteriormente serão executadas.

## CSS global e scoped

O CSS no Vue pode ser dividido em duas categorias:
- Global: Onde são definidos no App.vue, e se aplica à todos os elementos
- Scoped: Onde cada componente pode ter seu estilo, deixando mais fácil de personalizar os elementos

Geralmente são utilizados no modo scoped, para estilizar os componentes individualmente

## Renderização de listas

As listas (arrays) são rendereizadas por diretivas. Utiliza-se normalment eo `v-for` para isso. O dado pode vir de `data` como um array, e cada item pode ser impresso junto do HTML.

## Eventos

São utilizados para complementar ações dos usuários com ativações de métodos. Há diversos tipos de eventos em Vue, como o click: `@click`, que podem ser adicionados diretamente a elementos do HTML. O evento recebe um parâmetro que é o método que será executado.

Pode-se utilizar também múltiplos eventos. O Vue permite a entrada de múltiplos eventos em um único evento. A sintaxe permanece a mesma, porém os eventos serão separados por vírgula. Isso permite executar dois ou mais métodos com um click, por exemplo!

## Reutilização de componentes

No vue é comum a reutilização de componentes, cada componente deve ser completamente independente, podendo ativar seus métodos e mudar seus dados, assim que necessário. Para utilizar o recurso, basta invocar novamente o componente após a importação do mesmo.

## Passar dados com props

Os componentes do Vue podem receber dados, e este recurso é chamado de props. As props podem ser passadas por valores do data, como também podemos inserir diretamente eles. É necessário declarar as propriedades recebidas pelos componentes, em um array ou objeto chamado props.

## Emit

Com o emit, é possível ouvir um evento de um componente filho em um componente pai. Com isso, pode-se ativar comportamentos (como métodos) no componente pai. O evento deve ser registrado no componente, e é preciso definir o que será feito com a ativação do evento na chamada do componente. É como se fosse o @Output do Angular.

## Requisições ao backend usando Axios
Para instalar o axios, rodar:
```bash
npm16 install axios --save
```

É usual criar uma pasta `service` no projeto, e adicionar um arquivo api.js dentro da mesma declarando a URL base da API a ser consumida:

```js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export default api;
```

Feito isso, no arquivo .vue onde for feita a requisição, basta importar esse objeto, e fazer a requisição, como por ex:

```js
async getIngredientes() {
      await api.get('/ingredientes').then((response) => {
        this.paes = response.data.paes;
        this.carnes = response.data.carnes;
        this.opcionaisdata = response.data.opcionais;
      }).catch(error => {
        console.log(error);
      });

    },
```

## Toast Service (Mensagens de sucesso, erro, etc)

Instalar o mitt: 

```bash
npm16 install mitt --save
```

Importar o ToastService e o componente no main.js:
```js
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

app.use(ToastService);
app.component('Toast', Toast);

```

Importar o componente na tela desejada, e utilizar conforme exemplo abaixo: 

```vue
<template>
  <Toast />
</template>


<script>

....
methods: {
  mounted() {
    this.$toast.add({severity:ToastSeverity.SUCCESS, summary: 'Sucesso', detail:`Mensagem detalhada`, life: 3000});
  }
}
</script>
```

## Validação de Formulários

Utilizar o Vuelidate. Links de apoio: 
  - [Easy Form Validation with Vuelidate | Vue 3 Tutorial](https://www.youtube.com/watch?v=2BR6Vvjw3wQ) <- **O Melhor**
  - [Get Started](https://vuelidate-next.netlify.app/#getting-started-1)

## Vuex

O Vuex é a ferramenta oficial do Vuejs para o gerenciamento de estados da aplicação. É utilizado quando precisamos centralizar informações da nossa aplicação, que serão compartilhadas com todos os componentes, e que podem ser modificadas por eles. Para não gerar um código com vários emits e props aninhados, deixando-o em pouco tempo, impossível de manter.
Mais informações sobre o Vuex podem ser encontradas nos links abaixo:
  - [O que é Vuex?](https://vuex.vuejs.org/ptbr/)
  - [Aula gratuita de Vuex (em inglês)](https://scrimba.com/learn/vuex) 
  - [Aula gratuita em pt-br no YouTube](https://www.youtube.com/watch?v=TQ9Z_4CZpQg)


## Composition API

No Vue.js 3 foi introduzido o conceito de Composition API, substituindo o Options API que era presente no Vue.js 2.
A Composition API abstraiu toda as sessões: methods, data, created (lifecycle hooks)... em um método único, chamado setup. Ele vai expor as variáveis para o template.

Nem todas as variáveis serão reativas, é necessário informar que tal variável é reativa para que ela seja. Para isso deve-se declarar dentro do setup() o hook `ref`: 
```js
import { ref } from 'vue'
.
.
.
const variavel = ref('Hello World')
```

Dentro do setup, devemos acessar o valor dessa variável com .value. Logo, com o exemplo acima, ficaria da seguinte forma: `variavel.value = 'Outro valor'`. Fora do setup() não é necessário informar a variável value.

Existe um outro hook chamado reactive, que vai adicionar reatividade em todos os objetos aninhados. Ex:

```js
const data = reactive({
  quotes: {
    test: ''
  }
})
```
Com isso, adicionando um v-model em um input, por exemplo, com o valor: data.quotes.test, o mesmo vai ser reativo!

Aqui está um link de apoio para entender fundamentos da Composition API: 
  - [Vue School](https://vueschool.io/courses/vue-js-fundamentals-with-the-composition-api)

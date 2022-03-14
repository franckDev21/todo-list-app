<script setup>
import {ref,onMounted,computed} from 'vue'
import {useStore} from "vuex"

import Field from "./components/Field.vue"
import AddTodo from "./components/AddTodo.vue"

const store = useStore()
const todos = store.getters.todos
const remaining = computed(() => {
  return store.getters.remaining
})
const filteredTodos = computed(() => {
  return [...store.getters.filteredTodos].reverse()
})
const lenght = computed(() => {
  return [...todos].length
})
const allDone = computed(() => {
  return store.getters.allDone
})
const theme  = ref('dark')
const filter = computed(() => {
  return store.getters.filter
})

let body = null

onMounted(()=>{
  body = document.querySelector('body')
})

const toggleTheme = () => {
  if(theme.value === 'dark') {
    theme.value = 'light'
    body.style.backgroundColor = 'hsl(236, 33%, 92%)'
  }else{
    theme.value = 'dark'
    body.style.backgroundColor = 'hsl(235, 21%, 11%)'
  }
}
const checkAllTodo = () => {
  store.dispatch('checkAll',allDone.value)
}
const addNewTodo = (todo) => {
  store.dispatch('addTodo',todo)
}
const checkOne = (todo) => {
  store.dispatch('setTodo',todo.id)
}
const deleteOne = (id) => {
  store.dispatch('deleteTodo',id)
}
const setFilter = (value) => {
  store.dispatch('setFilter',value)
}
const clear = () => {
  store.dispatch('clear')
}

</script>
<template>
  <div class="header">
    <img v-if="theme === 'dark'" class="header__img"
         srcset="./assets/bg-desktop-dark.jpg 1440w, ./assets/bg-mobile-dark.jpg 375w "
         src="./assets/bg-desktop-dark.jpg" alt="">
    <img v-if="theme === 'light'" class="header__img"
         srcset="./assets/bg-desktop-light.jpg 1440w, ./assets/bg-mobile-light.jpg 375w "
         src="./assets/bg-desktop-light.jpg" alt="">

    <nav class="nav container">
      <div class="nav__logo">TODO</div>
      <div class="nav__icon" @click="toggleTheme">
        <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
        <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
      </div>
    </nav>

    <!-- permet d'ajouter une nouvelle tâche à faire dans mon tab[] :todos -->
    <AddTodo @add-todo="addNewTodo" @check-all="checkAllTodo" :allDone="allDone" :theme="theme"/>

  </div>

  <div class="content ">
    <form class="card container" :class="theme === 'light' ? 'card--light':''">

      <Field @delete-todo="deleteOne" @check-todo="checkOne" v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />

      <div v-if="lenght > 0" class="card__field card__field--end">
        <div class="complete">{{ remaining }} Task{{ remaining > 1 ? 's':'' }}</div>
        <div class="links">
          <a href="#" :class="{active: filter === 'all'}" @click.prevent="setFilter('all')">All</a>
          <a href="#" :class="{active: filter === 'todo'}" @click.prevent="setFilter('todo')">Todo</a>
          <a href="#" :class="{active: filter === 'done'}" @click.prevent="setFilter('done')">Completed</a>
        </div>
        <div @click="clear" class="clear">Clear Completed</div>
      </div>
    </form>

    <div v-if="lenght > 0" class="content__footer container" :class="theme === 'light' ? 'content__footer--light':''">
      <a href="#" :class="{active: filter === 'all'}" @click.prevent="setFilter('all')">All</a>
      <a href="#" :class="{active: filter === 'todo'}" @click.prevent="setFilter('todo')">Todo</a>
      <a href="#" :class="{active: filter === 'done'}" @click.prevent="setFilter('done')">Completed</a>
    </div>

    <footer v-if="lenght > 0">Drag and drop to reorder list</footer>
  </div>

</template>

<style lang="scss">
@import './assets/scss/main.scss';

.header{
  @media (min-width: 590px) {
    height: 300px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content{
  padding: 0 21.600px ;
  &__footer{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: .3rem;
    overflow: hidden;
    background-color: $very-dark-desaturated-blue;
    padding: 1rem .5rem;
    & > a{
      display: inline-block;
      margin: 0 1rem;
      font-size: 15px;
      color: $dark-grayish-blue;
      font-weight: bold;
      &.active{
        color: $bright-blue;
      }
    }
    @media (min-width: 590px) {
      display: none;
      height: 0;
      width: 0;
      overflow: hidden;
    }
    &--light{
      background-color: $very-light-gray;
    }
  }

}

footer{
  margin-top: 4rem;
  color: $dark-grayish-blue;
  font-size: 16px;
  margin-bottom: 2rem;
}
</style>

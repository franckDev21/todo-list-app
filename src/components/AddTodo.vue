<script setup>
import {defineProps, defineEmits, ref} from "vue"

const emit = defineEmits()

defineProps({
  theme : {
    type : String
  },
  allDone : Boolean
})

const newTodo = ref('')

const checkAll = () => {
  emit('check-all')
}

const add = () => {
  if(newTodo.value !== ''){
    emit('add-todo',newTodo.value)
    newTodo.value = ''
  }
}

</script>

<template>
  <form class="header__form container" :class="theme === 'light' ? 'header__form--light':''">
    <label @click="checkAll" :class="{active : allDone}">
      <svg v-if="allDone" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </label>
    <input @keyup.prevent.enter="add" v-model="newTodo" type="text" placeholder="Create a new todo...">
  </form>
</template>
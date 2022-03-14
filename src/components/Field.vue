<script setup>
  import {defineProps,defineEmits} from "vue"

  const emit = defineEmits()

  const props = defineProps({
    todo : {
      type : Object
    }
  })

  const check = () => {
    emit('check-todo',props.todo)
  }

  const deleteTodo = (e) => {
    e.stopPropagation()
    emit('delete-todo',props.todo.id)
  }

</script>
<template>
  <div @click="check" class="card__field" :class="todo.completed ? 'card__field--completed':''">
    <input type="checkbox"  hidden>
    <label>
      <svg v-if="todo.completed" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </label>
    <div class="text">{{todo.content}}</div>
    <svg @click.prevent="deleteTodo" class="croix" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
  </div>
</template>

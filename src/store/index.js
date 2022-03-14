import {createStore} from 'vuex'
export default createStore({
  state: {
    todos : [
      {
        id: (new Date).getTime(),
        content : "Apprendre React JS",
        completed : false
      },
      {
        id: (new Date).getTime()+1,
        content : "Apprendre  Vue JS",
        completed : true
      },
      {
        id: (new Date).getTime()+2,
        content : "Faire mon site porte-folio",
        completed : false
      },
    ],
    filter : 'all',
  },
  getters :{
    todos : state => state.todos,
    remaining : state => state.todos.filter(todo => !todo.completed).length,
    filter : state => state.filter,
    filteredTodos : state => {
      if (state.filter === 'todo') {
        return state.todos.filter(todo => !todo.completed)
      }else if (state.filter === 'done'){
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    allDone : state => state.todos.filter(todo => !todo.completed).length === 0
  },
  mutations: {
    ADD_TODO: (state, newTodo) => state.todos.push({id: (new Date).getTime(), content: newTodo, completed: false}),
    SET_TODO: (state, id) => {
      let task = state.todos.filter(todo => todo.id === id)[0]
      if (task.completed === true) {
        task.completed = false
      } else {
        task.completed = true
      }
    },
    DELETE_TODO: (state, id) => {
      let todo = state.todos.filter(todo => todo.id === id)
      let i = state.todos.indexOf(...todo)
      if (i > -1) {
        state.todos.splice(i, 1)
      }
    },
    CHECK_ALL: (state,allDone) => {
      let bool = false
      if(allDone) bool = true
      state.todos.forEach(todo => {
        todo.completed = !bool
      })
    },
    SET_FILTER: (state, value) => state.filter = value,
    CLEAR : state => {
      state.todos.forEach(todo => {
        if (todo.completed) todo.completed = false
      })
    }
  },
  actions: {
    addTodo : ({commit},newTodo) => commit('ADD_TODO',newTodo),
    setTodo : ({commit},id) => commit('SET_TODO',id),
    deleteTodo : ({commit},id) => commit('DELETE_TODO',id),
    checkAll : ({commit},allDone) => commit('CHECK_ALL',allDone),
    setFilter : ({commit},value) => commit('SET_FILTER',value),
    clear : ({commit}) => commit('CLEAR')
  },
  modules: {
  }
})

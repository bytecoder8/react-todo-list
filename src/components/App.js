import React from 'react'
import TodoList from './TodoList'

const items = [
  {
    title: 'Buy coffee beans',
  },
  {
    title: 'Buy a milk',
  },
  {
    title: 'Make a coffee'
  }
]

const App = () => (
  <div id="app">
    <h1>Todo List</h1>
    <TodoList items={items} />
  </div>
)

export default App

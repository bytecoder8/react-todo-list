import React from 'react'
import TodoList from './TodoList'
import SearchPanel from './SearchPanel'
import TodoFilter from './TodoFilter'
import './App.css'

const items = [
  {
    id: 1,
    title: 'Buy coffee beans',
    important: false,
    completed: true
  },
  {
    id: 2,
    title: 'Buy a milk',
    important: false,
    completed: false
  },
  {
    id: 3,
    title: 'Make a coffee',
    important: true,
    completed: false
  }
]

const App = () => (
  <div id="app" className="app row">
    <div className="col-12 offset-0 col-lg-6 offset-lg-3 ">
      <header className="row">
        <h1 className="title col-12 col-md-6">
          Todo List
        </h1>
        <div className="stats col-12 col-md-6">
          2 more to do, 1 done
        </div>
      </header>
      <div className="filters row">
        <div className="col-12 col-md-6">
          <SearchPanel />
        </div>
        <div className="col-12 col-md-6">
          <TodoFilter />
        </div>
      </div>
      <TodoList items={items} />
    </div>
  </div>
)

export default App

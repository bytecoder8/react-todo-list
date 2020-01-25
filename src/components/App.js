import React, { Component } from 'react'
import TodoList from './TodoList'
import SearchPanel from './SearchPanel'
import TodoFilter from './TodoFilter'
import TodoItemAdd from './TodoItemAdd'
import './App.css'

const initialItems = [
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

export default class App extends Component {

  state = {
    items: initialItems
  }

  deleteItem = (id) => {
    this.setState( ({ items }) => {
      return {
        items: items.filter( item => item.id !== id)
      }
    })
  }

  addItem = (title) => {
    this.setState( ({ items }) => {
      const maxId = items.reduce((acc, curr) => {
        return(curr.id > acc ? curr.id : acc)
      }, 0)
      const newItem = {
        id: maxId + 1,
        title,
        important: false,
        completed: false
      }
      return {
        items: items.concat(newItem) 
      }
    })
  }

  updateItemFlag = (id, flagName) => {
    this.setState( ({ items }) => {
      const updatedItems = items.map( item => {
        if (item.id === id) {
          return {
            ...item,
            [flagName]: !item[flagName]
          }
        }
        return item
      })
      
      return {
        items: updatedItems
      }
    })
  }

  markItemComplete = (id) => {
    this.updateItemFlag(id, 'completed')
  }

  markItemImportant = (id) => {
    this.updateItemFlag(id, 'important')
  }

  render() {
    const { items = [] } = this.state

    return(
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
            <TodoList items={items}
              handleItemDelete={ this.deleteItem }
              handleItemComplete={ this.markItemComplete }
              handleMarkImportant={ this.markItemImportant }
            />
            <TodoItemAdd handleItemAdd={ this.addItem } />
        </div>
      </div>
    )
  }
}

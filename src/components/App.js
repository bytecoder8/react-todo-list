import React, { Component } from 'react'
import LocalStorageAdapter from '../services/storage/LocalStorageAdapter'
import { debounce } from 'lodash'
import { initialItems } from '../store'
import TodoList from './TodoList'
import SearchPanel from './SearchPanel'
import TodoFilter from './TodoFilter'
import TodoItemAdd from './TodoItemAdd'
import './App.css'


export default class App extends Component {

  constructor(props) {
    super(props)

    this.storage = new LocalStorageAdapter('todo-list')
    let data = this.storage.loadData()
    if (!data) {
      this.state = {
        items: initialItems,
        search: '',
        filter: 'all'
      }
    } else {
      this.state = {
        items: data.items,
        search: data.search,
        filter: data.filter
      }
    }

    this.debouncedSaveData = debounce(() => {
      this.storage.saveData(this.state)
    }, 250)
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      this.debouncedSaveData()
    }
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
  
  handleSearch = (text) => {
    this.setState({
      search: text
    })
  }

  handleFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  getStats = () => {
    const { items } = this.state
    const completed = items.reduce((acc, curr) => {
      return(curr.completed ? acc + 1 : acc)
    }, 0)

    const remaining = items.length - completed
    return { completed, remaining }
  }

  getFilteredItems = () => {
    const { search, filter, items } = this.state
    const searchText = search.trim().toLowerCase()

    return items.filter( item => {
      let match = true

      switch (filter) {
        case 'active':
          if (item.completed) {
            match = false
          }
          break;
        case 'done':
          if (!item.completed) {
            match = false
          }
        default:
          break;
      }

      if (searchText.length) {
        if (item.title
          .toLowerCase()
          .indexOf(searchText) === -1) 
        {
          match = false
        }
      }

      return match
    })
  }

  render() {
    const { search, filter } = this.state
    const { completed, remaining } = this.getStats()
    const items = this.getFilteredItems()

    return(
      <div id="app" className="app row">
        <div className="col-12 offset-0 col-lg-6 offset-lg-3 ">
          <header className="row">
            <h1 className="title col-12 col-md-6">
              Todo List
            </h1>
            <div className="stats col-12 col-md-6">
              { remaining ? `${remaining} more to do` : 'Nothing to do' }, { completed } done
            </div>
          </header>
          <div className="filters row">
            <div className="col-12 col-md-6">
              <SearchPanel handleSearch={ this.handleSearch } searchText={ search } />
            </div>
            <div className="col-12 col-md-6">
              <TodoFilter handleFilterChange={ this.handleFilterChange } filter={ filter } />
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

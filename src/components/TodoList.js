import React from 'react'
import TodoListItem from './TodoListItem'
import './TodoList.css'

const TodoList = ({ items }) => {
  const elements = items.map( item => {
    
    const { id, ...itemProps } = item

    return (
      <li key={item.title} className="list-group-item"
        ><TodoListItem { ...itemProps } /></li>
      )
  })

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  )
}

export default TodoList

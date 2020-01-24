import React from 'react'
import TodoListItem from './TodoListItem'
import './TodoList.css'

const TodoList = ({ items, handleItemDelete }) => {
  const elements = items.map( item => {
    
    const { id, ...itemProps } = item

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          { ...itemProps }
          handleItemDelete={ () => handleItemDelete(id) }
        />
      </li>
    )
  })

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  )
}

export default TodoList

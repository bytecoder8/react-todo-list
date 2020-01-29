import React from 'react'
import PropTypes from 'prop-types'
import TodoListItem from '../TodoListItem'
import './TodoList.css'

const TodoList = ({ items, handleItemDelete, handleItemComplete, handleMarkImportant }) => {
  const elements = items.map( item => {
    
    const { id, ...itemProps } = item

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          { ...itemProps }
          handleItemDelete={ () => handleItemDelete(id) }
          handleItemComplete={ () => handleItemComplete(id) }
          handleMarkImportant={ () => handleMarkImportant(id) }
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

TodoList.propTypes = {
  items: PropTypes.array.isRequired,
  handleItemDelete: PropTypes.func.isRequired,
  handleItemComplete: PropTypes.func.isRequired,
  handleMarkImportant: PropTypes.func.isRequired
}

export default TodoList

import React from 'react'
import './TodoListItem.css'


const TodoListItem = ({ title, important, completed }) => {
  const style = {
    textDecoration: completed ? 'line-through' : '',
    fontWeight: important ? 'bold' : '',
    color: important ? 'teal' : ''
  }
  return (
    <div className="todo-list-item">
      <div className="title" style={style}>{ title }</div>
      <div className="buttons">
        <button type="button" className="btn btn-outline-success btn-sm">
          <i className="fa fa-exclamation"></i>
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default TodoListItem

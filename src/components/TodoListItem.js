import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TodoListItem.css'


export default class TodoListItem extends Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    important: PropTypes.bool,
    completed: PropTypes.bool,
    handleItemDelete: PropTypes.func.isRequired,
    handleItemComplete: PropTypes.func.isRequired,
    handleMarkImportant: PropTypes.func.isRequired
  }

  render() {
    const { title, important = false, completed = false, 
            handleItemDelete, handleItemComplete, handleMarkImportant 
          } = this.props

    let classNames = 'todo-list-item'
    if (important) {
      classNames += ' important'
    }
    if (completed) {
      classNames += ' completed'
    }

    return(
      <div className={ classNames } data-testid="todo-list-item">
        <div className="title" onClick={ handleItemComplete }>{ title }</div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            data-testid="todo-list-mark-important"
            onClick={ handleMarkImportant }
          >
            <i className="fa fa-exclamation"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            data-testid="todo-list-delete"
            onClick={ handleItemDelete }
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

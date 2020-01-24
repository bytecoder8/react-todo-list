import React, { Component } from 'react'
import './TodoListItem.css'


export default class TodoListItem extends Component {
  
  state = {
    important: this.props.important,
    completed: this.props.completed
  }

  markCompleted = () => {
    this.setState( state => ({ completed: !state.completed }))
  }

  markImportant = () => {
    this.setState( state => ({ important: !state.important }))
  }

  render() {
    const { title, handleItemDelete } = this.props
    const { important, completed } = this.state

    let classNames = 'todo-list-item'
    if (important) {
      classNames += ' important'
    }
    if (completed) {
      classNames += ' completed'
    }

    return(
      <div className={ classNames }>
        <div className="title" onClick={ this.markCompleted }>{ title }</div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={ this.markImportant }
          >
            <i className="fa fa-exclamation"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleItemDelete}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

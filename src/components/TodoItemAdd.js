import React, { Component } from 'react'


export default class TodoItemAdd extends Component {
  render() {
    const { handleItemAdd } = this.props
    const title = 'new item'

    return (
      <div className="todo-item-add row">
        <div className="col-12 col-md-8">
          <input
            type="text"
            name="newItem"
            className="form-control mb-2"
          />
        </div>
        <div className="col-12 col-md-4">
          <button
            type="button"
            className="btn btn-block btn-outline-secondary"
            onClick={ () => handleItemAdd(title) }
          >Add Item</button>
        </div>
      </div>
    )
  }
}

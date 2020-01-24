import React, { Component } from 'react'
import { capitalize } from '../utils'

export default class TodoItemAdd extends Component {

  state = {
    title: ''
  }

  handleInputChange = (e) => {
    this.setState({
      title: capitalize(e.target.value)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleItemAdd(this.state.title.trim())
    this.setState({ title: '' })
  }

  render() {
    const { title } = this.state

    return (
      <form className="todo-item-add row" onSubmit={ this.handleSubmit }>
        <div className="col-12 col-md-8">
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Type and hit Enter to add"
            value={ title }
            onChange={ this.handleInputChange }
          />
        </div>
        <div className="col-12 col-md-4">
          <button
            type="submit"
            className="btn btn-block btn-outline-secondary"
          >Add Item</button>
        </div>
      </form>
    )
  }
}

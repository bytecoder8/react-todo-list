import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../utils'


export default class TodoItemAdd extends Component {
  static propTypes = {
    handleItemAdd: PropTypes.func.isRequired
  }

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
    const title = this.state.title.trim()
    if (title.length) {
      this.props.handleItemAdd(title)
      this.setState({ title: '' })
    }
  }

  render() {
    const { title } = this.state

    return (
      <form className="todo-item-add row" onSubmit={ this.handleSubmit } data-testid="todo-item-add">
        <div className="col-12 col-md-8">
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Type and hit Enter to add"
            value={ title }
            onChange={ this.handleInputChange }
            data-testid="todo-item-add-input"
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

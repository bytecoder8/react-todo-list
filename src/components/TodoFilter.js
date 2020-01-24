import React, { Component } from 'react'
import './TodoFilter.css'


export default class TodoFilter extends Component {
  render() {
    return (
      <div className="todo-filter">
        <button type="button" className="btn btn-info">All</button>
        <button type="button" className="btn btn-outline-secondary">Active</button>
        <button type="button" className="btn btn-outline-secondary">Done</button>
      </div>
    )
  }
}

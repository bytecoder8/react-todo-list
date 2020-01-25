import React from 'react'
import './TodoFilter.css'


export default function TodoFilter({
  handleFilterChange,
  filter
}) {

  const createButton = (text, filterValue) => {
    const current = filterValue === filter

    let classNames = 'btn'
    if (current) {
      classNames += ' btn-info'
    } else {
      classNames += ' btn-outline-secondary'
    }

    return (
      <button
        type="button"
        className={ classNames }
        onClick={ () => handleFilterChange( filterValue ) }
      >{ text }</button>
    )
  }

  return (
    <div className="todo-filter" data-testid="todo-filter">
      { createButton('All', '') }
      { createButton('Active', 'incompleted') }
      { createButton('Done', 'completed') }
    </div>
  )
}

import React from 'react'

export default function SearchPanel() {
  return (
    <div className="search-panel">
      <input
        type="text"
        name="search"
        placeholder="Type to search"
        className="form-control"
      />
    </div>
  )
}

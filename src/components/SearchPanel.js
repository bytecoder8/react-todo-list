import React from 'react'

export default function SearchPanel({ searchText, handleSearch }) {
  return (
    <div className="search-panel" data-testid="search-panel">
      <input
        type="text"
        name="search"
        placeholder="Type to search"
        className="form-control"
        value={ searchText }
        onChange={ (e) => handleSearch(e.target.value) }
      />
    </div>
  )
}

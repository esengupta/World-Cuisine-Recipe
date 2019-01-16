import React from 'react';

const SearchForm = ({ onSubmit, onChange, value, healthLabels }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Search by ingredients"
        className="form-control border-success mb-2"
        type="text"
        onChange={onChange}
        value={value}
        name="searchTerm"
      />
      <button
        className="btn btn-block btn-outline-dark"
        onClick={onSubmit}
      >
        Search
      </button>
      Health Labels<br />
      <input type="checkbox" name="vehicle1" value="Bike" /> I have a bike

    </form>
  )
}

export default SearchForm;
import React, { Component } from 'react';

class SearchForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          placeholder="Search by ingredients"
          className="form-control border-success mb-2"
          type="text"
          onChange={this.props.onChange}
          value={this.props.value}
          name="searchTerm"
        />
        <button
          className="btn btn-block btn-outline-dark"
          onClick={this.props.onSubmit}
        >
          Search
      </button>
      </form>
    )
  }
}

export default SearchForm;
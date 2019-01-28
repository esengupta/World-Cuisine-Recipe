import React, { Component } from 'react';

class SearchForm extends Component {

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div id="formDiv" className="input-group mx-auto mb-3">
          <input
            placeholder="Search by ingredients"
            className="form-control"
            type="text"
            onChange={this.props.onChange}
            value={this.props.value}
            name="searchTerm"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-dark"
              onClick={this.props.onSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default SearchForm;
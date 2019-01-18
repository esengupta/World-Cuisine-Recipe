import React, { Component } from "react";

import API from "../utils/API"
// import SearchForm from "../components/SearchForm";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Checkbox from '../components/Checkbox';
import Filters from './data/filters'

class Search extends Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  componentWillMount = () => {
    this.dietCheckboxes = new Set();
    this.healthCheckboxes = new Set();
  }

  toggleDietCheckbox = label => {
    if (this.dietCheckboxes.has(label)) {
      this.dietCheckboxes.delete(label);
    } else {
      this.dietCheckboxes.add(label);
    }
  }
  toggleHealthCheckbox = label => {
    if (this.healthCheckboxes.has(label)) {
      this.healthCheckboxes.delete(label);
    } else {
      this.healthCheckboxes.add(label);
    }
  }

  createDietCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleDietCheckbox}
      key={label}
    />
  )
  createHealthCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleHealthCheckbox}
      key={label}
    />
  )

  createDietCheckboxes = () => (
    Filters.diet.map(this.createDietCheckbox)
  )
  createHealthCheckboxes = () => (
    Filters.health.map(this.createHealthCheckbox)
  )

  // method to handle on change
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.searchTerm) {
      return false;
    }

    let diet = [];
    let health = [];
    for (const dietcheck of this.dietCheckboxes) {
      diet.push(dietcheck);
    }
    for (const healthcheck of this.healthCheckboxes) {
      health.push(healthcheck);
    }
    console.log(diet);
    console.log(health);

    API
      .searchRecipes(this.state.searchTerm, diet, health)
      .then(({ data }) => {
        console.log(data);
        this.setState({ recipes: data.hits })
      })
      .catch(err => {
        console.log(err)
        this.setState({ recipes: [] })
      });
  }

  render() {
    return (
      <div>
        <Jumbotron
          pagename="Recipe Search Page"
          description="Search for recipes by ingredients"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <form onSubmit={this.handleSubmit}>
                <input
                  placeholder="Search by ingredients"
                  className="form-control border-success mb-2"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.searchTerm}
                  name="searchTerm"
                />
                <button
                  className="btn btn-block btn-outline-dark"
                  onClick={this.handleSubmit}
                >
                  Search
                </button>
                <h6>Diet Labels</h6>
                {this.createDietCheckboxes()}
                <h6>Health Labels</h6>
                {this.createHealthCheckboxes()}
              </form>
            </div>
            <div className="col-9">
              {this.state.recipes.length ? (
                <div className="row align-items-stretch">
                  {this.state.recipes.map(recipe => (
                    <Card
                      key={recipe.recipe.uri}
                      title={recipe.recipe.label}
                      url={recipe.recipe.url}
                      ingredients={recipe.recipe.ingredientLines.join(", ")}
                      picture={recipe.recipe.image}
                      dietLabels={recipe.recipe.dietLabels.join(", ")}
                      healthLabels={recipe.recipe.healthLabels.join(", ")}
                    />
                  ))}
                </div>
              ) : (
                  <h3 className="text-center">No Recipes found.</h3>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;
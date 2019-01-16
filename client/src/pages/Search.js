import React, { Component } from "react";
// import Navbar from "../components/Navbar"

import API from "../utils/API"
import SearchForm from "../components/SearchForm";
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";

class Search extends Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  // componentDidMount(){
  //   this.loadRecipes();
  // };
 
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

    API
      .searchRecipes(this.state.searchTerm)
      .then(({ data }) => {
        console.log(data);
        this.setState({ recipes: data.hits })
      })
      .catch(err => console.log(err));
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
              <SearchForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                value={this.state.searchTerm}
              />
            </div>
            <div className="col-9">
              <div className="row align-items-stretch">
                {this.state.recipes.map(recipe => (
                  <Card
                    key={recipe.recipe.uri}
                    title={recipe.recipe.label}
                    href={recipe.recipe.url}
                    ingredients={recipe.recipe.ingredientLines.join(", ")}
                    thumbnail={recipe.recipe.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;
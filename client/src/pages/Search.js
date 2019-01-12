import React, { Component } from "react";
// import Navbar from "../components/Navbar"

import API from "../utils/API"
import SearchForm from "../components/SearchForm";
import Card from "../components/Card";

class Search extends Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  // componentDidMount(){
  //   this.loadRecipes();
  // };

  // loadRecipes = () => {

  // }
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
        this.setState({ recipes: data })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-3">
              <SearchForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                value={this.state.searchTerm}
              />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="row align-items-stretch">
              {this.state.recipes.map(recipe => (
                <Card
                  key={recipe.href}
                  title={recipe.title}
                  href={recipe.href}
                  ingredients={recipe.ingredients}
                  thumbnail={recipe.thumbnail}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;
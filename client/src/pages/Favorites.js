import React, { Component } from "react";

import API from "../utils/API"
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Navbar";

class Favorites extends Component {
  state = {
    searchTerm: "",
    recipes: [],
    user: "Bruce"
  };

  constructor(props){
    super(props)
  }
  componentDidMount() {
    this.props.auth.getProfile((profile) => {
      this.setState({
        user: profile.email
      })
      this.loadFavorites();
    })
  };

  loadFavorites = () => {
    console.log('user is' + this.state.user);
    API.getFavorites(this.state.user)
      .then(({ data }) => {
        console.log('returned data');
        console.log(data);
        this.setState({ recipes: data })
      })
      .catch(err => {
        console.log(err)
        this.setState({ recipes: [] })
      });
  };

  handleDelete = uri => {
    console.log("delete Fave");
    console.log(uri,this.state.user);
    API
      .deleteRecipe(uri, this.state.user)
      .then(({ data }) => {
        console.log(data);
        this.loadFavorites();
      })
      .catch(err => {
        console.log(err)
      });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.searchTerm) {
      return this.loadFavorites();
    }

    API
      .searchFavorites(this.state.user, this.state.searchTerm)
      .then(({ data }) => {
        console.log('returned data');
        console.log(data);
        this.setState({ recipes: data })
      })
      .catch(err => {
        console.log(err)
        this.setState({ recipes: [] })
      });
  };

  render() {
    return (
      <div>
        <Jumbotron
          pagename="Recipe Favorites Page"
          description="The recipes that are your favoriates"
        />
        <SearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          onClick={this.handleSubmit}
        />
        <div className="container-fluid">
          <div className="col-12">
            {this.state.recipes.length ? (
              <div className="row align-items-stretch">
                {this.state.recipes.map(recipe => (
                  <Card
                    key={recipe.uri}
                    uri={recipe.uri}
                    title={recipe.title}
                    url={recipe.url}
                    ingredients={recipe.ingredients.join(", ")}
                    picture={recipe.image}
                    dietLabels={recipe.dietLabels.join(", ")}
                    healthLabels={recipe.healthLabels.join(", ")}
                    handleDelete={this.handleDelete}
                  />
                ))}
              </div>
            ) : (
                <h3 className="text-center">No Recipes found.</h3>
              )}
          </div>
        </div>
      </div>
    );
  }

}

export default Favorites;
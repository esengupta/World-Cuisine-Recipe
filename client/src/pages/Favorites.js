import React, { Component } from "react";
// import Navbar from "../components/Navbar"

import API from "../utils/API"
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Jumbotron from "../components/Jumbotron";

class Favorites extends Component {
  state = {
    recipes: []
  };

  componentDidMount(){
    this.loadFavorites();
  };

  loadFavorites = () => {
    const user = 'Bruce';
    console.log('user is');
    console.log(user);
    API
      .getFavorites(user)
      .then(({ data }) => {
        console.log('returned data');
        console.log(data);
        this.setState({ recipes: data })
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
          pagename="Recipe Favorites Page"
          description="The recipes that are your favoriates"
        />
        <div className="container-fluid">
          <div className="col-12">
            {this.state.recipes.length ? (
              <div className="row align-items-stretch">
                {this.state.recipes.map(recipe => (
                  <Card
                    key={recipe.uri}
                    uri={recipe.uri}
                    title={recipe.label}
                    url={recipe.url}
                    ingredients={recipe.ingredients.join(", ")}
                    picture={recipe.image}
                    dietLabels={recipe.dietLabels.join(", ")}
                    healthLabels={recipe.healthLabels.join(", ")}
                    handleSave={this.handleSave}
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
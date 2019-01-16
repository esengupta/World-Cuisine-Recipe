import React, { Component } from "react";
// import Navbar from "../components/Navbar"

// import API from "../utils/API"
import SearchForm from "../components/SearchForm";
import Jumbotron from "../components/Jumbotron";

class Favorites extends Component {
  state = {
    searchTerm: "",
    recipes: []
  };

  // componentDidMount(){
  //   this.loadRecipes();
  // };

  // loadRecipes = () => {

  // }


  render() {
    return (
      <div>
        <Jumbotron
          pagename="Recipe Search Page"
          description="Search for recipes by ingredients"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-3">
              <SearchForm />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="row align-items-stretch">
              <h2>Favoraite Recipes displayed here</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Favorites;
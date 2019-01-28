import React, { Component } from "react";
import Pagination from "react-js-pagination";

import API from "../utils/API"
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import Jumbotron from "../components/Jumbotron";

class Favorites extends Component {
  state = {
    searchTerm: "",
    recipes: [],
    displayPage: [],
    activePage: 1,
    user: ""
  };

  constructor(props) {
    super(props)
  };

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
        this.setState({ recipes: data });
        this.handlePageChange(1);
      })
      .catch(err => {
        console.log(err);
        this.setState({ recipes: [] });
        this.setState({ displayPage: [] });
        this.setState({ activePage: 1 });
      });
  };

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`)
    let newArr = [];
    for (let i = (pageNumber - 1) * 10; i < pageNumber * 10; i++) {
      if (i < this.state.recipes.length) {
        newArr.push(this.state.recipes[i]);
      }
    }
    this.setState({ activePage: pageNumber });
    this.setState({ displayPage: newArr });
  }

  handleDelete = uri => {
    console.log("delete Fave");
    console.log(uri, this.state.user);
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
              <div>
                <div className="row align-items-stretch">
                  {this.state.displayPage.map(recipe => (
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
                <div className='mx-auto'>
                  <Pagination
                    hideDisabled
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.recipes.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    linkClass={'page-link'}
                    itemClass={'page-item'}
                    activeClass={'active'}
                  />
                </div>
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
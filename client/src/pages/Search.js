import React, { Component } from "react";
import Pagination from "react-js-pagination";

import API from "../utils/API"
import Card from "../components/Card";
import Jumbotron from "../components/Jumbotron";
import Checkbox from '../components/Checkbox';
import Filters from './data/filters'

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      recipes: [],
      displayPage: [],
      activePage: 1,
      status: "Start Search",
      savedArray: []
    };
  }

  login = uri => {
    console.log("login");
    API
      .login()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      });
  }

  componentWillMount = () => {
    this.dietCheckboxes = new Set();
    this.healthCheckboxes = new Set();
  }
  // componentDidMount() {
  //   this.loadFavorites();
  // };

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
    this.setState({ status: "Loading..." });

    let diet = [];
    let health = [];
    for (const dietcheck of this.dietCheckboxes) {
      diet.push(dietcheck.toLowerCase());
    }
    for (const healthcheck of this.healthCheckboxes) {
      health.push(healthcheck.toLowerCase());
    }
    console.log(diet);
    console.log(health);

    API
      .searchRecipes(this.state.searchTerm, diet, health)
      .then(({ data }) => {
        console.log(data);
        this.setState({ recipes: data.hits });
        this.handlePageChange(1);
      })
      .catch(err => {
        console.log(err)
        this.setState({ recipes: [] });
        this.setState({ displayPage: [] });
        this.setState({ activePage: 1 });
      });
  }

  handleSave = uri => {
    console.log("save Fave");
    let tempArr = this.state.savedArray;
    tempArr.push(uri);
    this.setState({ savedArray: tempArr });

    let saveRecipe = {};
    this.props.auth.getProfile((data) => {
      this.state.recipes.forEach(item => {
        if (item.recipe.uri === uri) {
          saveRecipe.username = data.email;
          saveRecipe.title = item.recipe.label;
          saveRecipe.ingredients = item.recipe.ingredientLines;
          saveRecipe.uri = item.recipe.uri.substring(item.recipe.uri.indexOf("#") + 1);
          saveRecipe.url = item.recipe.url;
          saveRecipe.image = item.recipe.image;
          saveRecipe.dietLabels = item.recipe.dietLabels;
          saveRecipe.healthLabels = item.recipe.healthLabels;
        }
      });
      console.log(saveRecipe);
      API
        .saveRecipe(saveRecipe)
        .then(({ data }) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err)
        });
    })
  }

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
    this.setState({ status: "No Records Found." });
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
            <div className="col-4 col-md-3 col-lg-2">
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
                <hr />
                <h6>Diet Labels</h6>
                {this.createDietCheckboxes()}
                <h6>Health Labels</h6>
                {this.createHealthCheckboxes()}
              </form>
            </div>
            <div className="col-8 col-md-9 col-lg-10">
              {this.state.recipes.length ? (
                <div>
                  <div className="row align-items-stretch">
                    {this.state.displayPage.map(recipe => (
                      <Card
                        key={recipe.recipe.uri}
                        uri={recipe.recipe.uri}
                        title={recipe.recipe.label}
                        url={recipe.recipe.url}
                        ingredients={recipe.recipe.ingredientLines.join(", ")}
                        picture={recipe.recipe.image}
                        dietLabels={recipe.recipe.dietLabels.join(", ")}
                        healthLabels={recipe.recipe.healthLabels.join(", ")}
                        handleSave={this.handleSave}
                        isLoggedIn={this.props.auth.isAuthenticated()}
                        saveColor={this.state.savedArray.indexOf(recipe.recipe.uri) === -1 ? 'btn-primary' : 'btn-success'}
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
                  <h3 className="text-center">{this.state.status}</h3>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Search;
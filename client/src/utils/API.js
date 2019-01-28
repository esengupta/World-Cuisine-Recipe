import axios from 'axios';
import Auth from './Auth/Auth';

let auth = new Auth();

export default {

  searchRecipes: function (search, diet, health) {

      let urlquery = `q=${search}`;
      diet.forEach(element => {
        urlquery += `&diet=${element}`;
      });
      health.forEach(element => {
        urlquery += `&health=${element}`;
      });
      // console.log('call edamam api');
      // console.log(urlquery);
      return axios.get(`/api/apirecipes/${urlquery}`);
  },

  saveRecipe: function(recipeData) {
    return axios.post('/api/recipe', recipeData)
  },

  deleteRecipe: function(uri, username) {
    console.log('deleteRecipe');
    console.log(uri, username);
    return axios.delete(`/api/recipe/user/${username}/uri/${uri}`)
  },

  getFavorites: function(username) {
    console.log('getFavorites');
    return axios.get(`/api/recipe/user/${username}`)
  },

  searchFavorites: function(username, query) {
    console.log('serachFavorites');
    console.log(username, query);
    return axios.get(`/api/recipe/user/${username}/query/${query}`)
  },

}

import axios from 'axios';

export default {

  login: function() {
    axios.get('/auth/login')
    // .then(res=> {
    //   console.log('1212')
    //   console.log(res);
    // })
    // .catch(err => console.log(err));
    
  },

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
    console.log(username);
    return axios.get(`/api/recipe/user/${username}`)
  },

  searchFavorites: function(username, query) {
    console.log('serachFavorites');
    console.log(username, query);
    return axios.get(`/api/recipe/user/${username}/query/${query}`)
  },

  login: function() {
    console.log('login');
    return axios.get(`/auth/user`)
  },


}

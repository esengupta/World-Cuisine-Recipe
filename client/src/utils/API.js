import axios from 'axios';

export default {

  searchRecipes: function (search, diet, health) {

      let urlquery = `q=${search}`  //&to=${maxRec}`;
      // let urlquery = `https://api.edamam.com/search?q=${search}&app_id=${appID}&app_key=${appKey}&to=${maxRec}`;
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

  getFavorites: function(user) {
    console.log('getFavorites');
    console.log(user);
    return axios.get(`/api/recipe?username=${user}`)
  },

  deleteRecipe: function(uri) {
    console.log('deleteRecipe');
    console.log(uri);
    return axios.delete(`/api/recipe/${uri}`)
  },

}

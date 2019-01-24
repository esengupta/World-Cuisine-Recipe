import axios from 'axios';

export default {

  searchRecipes: function (search, diet, health) {
    const appID = "43f51de6";
    const appKey = "dfe2f7767832a208576c7e3597b7a3aa";

    const maxRec = 100;

      let urlquery = `https://api.edamam.com/search?q=${search}&app_id=${appID}&app_key=${appKey}&to=${maxRec}`;
      diet.forEach(element => {
        urlquery += `&diet=${element}`;
      });
      health.forEach(element => {
        urlquery += `&health=${element}`;
      });

      return axios.get(urlquery);
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

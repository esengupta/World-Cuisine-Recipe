import axios from 'axios';

export default {

  searchRecipes: function (search, diet, health) {
    const appID = "43f51de6";
    const appKey = "dfe2f7767832a208576c7e3597b7a3aa";

    const maxRec = 21;
    let manualBuild = false;
    let dietSearch = "";
    let noDiet = false;
    let healthSearch = "";
    let noHealth = false;

    if (diet.length > 1) {
      // need the manually create url
      manualBuild = true;
    } else if (diet.length === 1) {
      dietSearch = diet[0];
    } else {
      noDiet = true;
    }

    if (health.length > 1) {
      // need the manually create url
      manualBuild = true;
    } else if (health.length === 1) {
      healthSearch = health[0];
    } else {
      noHealth = true;
    }


    if (manualBuild) {
      // manually create the url here
      let urlquery = `https://api.edamam.com/search?q=${search}&app_id=${appID}&app_key=${appKey}&to=${maxRec}`;
      diet.forEach(element => {
        urlquery += `&diet=${element}`;
      });
      health.forEach(element => {
        urlquery += `&health=${element}`;
      });

      return axios.get(urlquery);

    } else {

      let query = {};
      query.q = search;
      query.app_id = appID;
      query.app_key = appKey;
      query.to = maxRec;
      if (!noDiet) {
        query.diet = dietSearch;
      }
      if (!noHealth) {
        query.health = healthSearch;
      }

      return axios.get('https://api.edamam.com/search', {
        params: query
      })
    }
  },

  saveRecipe: function(recipeData) {
    return axios.post('/api/recipe', recipeData)
  },
  getFavorites: function(user) {
    console.log('getFavorites');
    console.log(user);
    return axios.get(`/api/recipe?username=${user}`)
  },

}

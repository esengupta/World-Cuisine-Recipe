import axios from 'axios';

export default {

  searchRecipes: function (query) {
    return axios.get('https://api.edamam.com/search', {
      params: {
        q: query,
        app_id: "43f51de6",
        app_key: "dfe2f7767832a208576c7e3597b7a3aa",
        to: 20
      }
    })
  }

}

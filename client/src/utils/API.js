import axios from 'axios';

export default {
  // searchRecipes: function (query) {
  //   return axios
  //     .get('https://www.recipepuppy.com/api/', {
  //       params: {
  //         q: query
  //       }
  //     })
  // }

  searchRecipes: function (query) {
    console.log("hit")
    return axios.get('http://localhost:3001/api/search', {
      params: {
        q: query
      }
    })
  }

}

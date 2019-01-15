import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/favorites" component={Favorites} />
            <Route
              render={() => <h1 className="text-center">Where are you?
              </h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

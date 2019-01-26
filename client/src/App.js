import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Auth from './utils/Auth/Auth';


class App extends Component {
  constructor(props) {
    super();
    // Auth0 instance
    this.auth = new Auth();
  }
  componentWillMount() {
    if (window.location.href.includes('access_token')){
      this.auth.handleAuthentication()
    } else if (this.auth.isAuthenticated()) {
      this.auth.getProfile((data)=> {console.log(data)})
    }

    this.setState({loggedIn: this.auth.isAuthenticated()})
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar auth={this.auth}/>
          <Switch>
            <Route exact path="/" component={ (props) => {return <Search auth={this.auth} />} }/>
            <Route exact path="/favorites" component={Favorites} />
            {/* <Route path="/callback" render={(props) => {
              this.auth.handleAuthentication();
            }}/> */}
            <Route
              render={() => <h1 className="text-center">Sorry, the page you requested does not exist.
              </h1>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

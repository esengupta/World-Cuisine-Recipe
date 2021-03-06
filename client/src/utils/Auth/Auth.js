import auth0 from 'auth0-js';
export default class Auth {
  
  auth0 = new auth0.WebAuth({
    domain: 'esengpta.auth0.com',
    clientID: 'Apb7iVrs0T3bTnOmWeKpHUbaaiRm7DS0',
    // redirectUri: 'http://localhost:3001/',
    redirectUri: 'https://worldcuisinerecipe.herokuapp.com/',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });
  profile;
  
  constructor() {
      this.logout = this.logout.bind(this);
      this.login = this.login.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getProfile = this.getProfile.bind(this);
  }
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        window.location.assign('/');
      } else if (err) {
        console.log(err);
      }
    });
  }
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
  getAccessToken(){
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken;
  }

  getProfile(cb){
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(profile, err);
    });
  }
  
  login() {
    this.auth0.authorize();
    this.handleAuthentication()
  }
  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.assign('/');
  }
  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './styles/App.css';

class App extends React.Component {
  state = {
    isRedirect: false,
  }

  loginRedirect = () => {
    this.setState({ isRedirect: true });
  }

  render() {
    const { isRedirect } = this.state;

    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/project-trybetunes/search" component={ Search } />
            <Route exact path="/project-trybetunes/album/:id" component={ Album } />
            <Route exact path="/project-trybetunes/favorites" component={ Favorites } />
            <Route
              exact
              path="/project-trybetunes/profile/edit"
              component={ ProfileEdit }
            />
            <Route exact path="/project-trybetunes/profile" component={ Profile } />
            {
              isRedirect && <Redirect to="/project-trybetunes/search" />
            }
            <Route
              exact
              path="/project-trybetunes"
              render={ () => <Login loginRedirect={ this.loginRedirect } /> }
            />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

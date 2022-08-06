import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
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
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/profile" component={ Profile } />
            {
              isRedirect && <Redirect to="/search" />
            }
            <Route
              exact
              path="/"
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

import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
    state = {
      loading: true,
      user: '',
    }

    async componentDidMount() {
      const obtainedUser = await getUser();
      this.setState({
        loading: false,
        user: obtainedUser,
      });
    }

    render() {
      const { loading, user } = this.state;

      return (
        <header data-testid="header-component">
          {
            loading ? <Loading /> : (
              <p data-testid="header-user-name">{user.name}</p>
            )
          }
        </header>
      );
    }
}

export default Header;

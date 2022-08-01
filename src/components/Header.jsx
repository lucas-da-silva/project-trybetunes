import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
              <div>
                <p data-testid="header-user-name">{user.name}</p>
              </div>
            )
          }
          <section>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </section>
        </header>
      );
    }
}

export default Header;

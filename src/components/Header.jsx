import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingSmall from './LoadingSmall';
import LOGOSMALL from '../images/logoSmall.png';
import '../styles/Header.css';

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
            loading ? <LoadingSmall /> : (
              <div className="header-container">
                <img src={ LOGOSMALL } alt="Logo TrybeTunes" />
                <div className="user-container">
                  <p data-testid="header-user-name">{user.name}</p>
                </div>
              </div>
            )
          }
          <section className="links-container">
            <div className="links-div">
              <Link
                className="link"
                to="/search"
                data-testid="link-to-search"
              >
                Pesquisa
              </Link>
            </div>
            <div className="links-div">
              <Link
                className="link"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favoritas
              </Link>
            </div>
            <div className="links-div">
              <Link
                className="link"
                to="/profile"
                data-testid="link-to-profile"
              >
                Perfil
              </Link>
            </div>
          </section>
        </header>
      );
    }
}

export default Header;

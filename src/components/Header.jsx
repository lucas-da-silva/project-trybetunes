import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingSmall from './LoadingSmall';
import LOGOSMALL from '../images/logoSmall.png';
import USER from '../images/user.png';
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
      const { classDiv, classLink, userImage } = this.props;
      let imageProfile = USER;

      if (userImage) {
        imageProfile = userImage;
      }

      return (
        <header data-testid="header-component">
          {
            loading ? <LoadingSmall /> : (
              <section>
                <div className="header-container">
                  <img src={ LOGOSMALL } alt="Logo TrybeTunes" />
                  <div className="user-container">
                    <img src={ imageProfile } alt="Imagem de perfil" />
                    <p data-testid="header-user-name">{user.name}</p>
                  </div>
                </div>
                <section className="links-container">
                  <div className={ `links-div ${classDiv}-1` }>
                    <Link
                      className={ `link ${classLink}-1` }
                      to="/search"
                      data-testid="link-to-search"
                    >
                      Pesquisa
                    </Link>
                  </div>
                  <div className={ `links-div ${classDiv}-2` }>
                    <Link
                      className={ `link ${classLink}-2` }
                      to="/favorites"
                      data-testid="link-to-favorites"
                    >
                      Favoritas
                    </Link>
                  </div>
                  <div className={ `links-div ${classDiv}-3` }>
                    <Link
                      className={ `link ${classLink}-3` }
                      to="/profile"
                      data-testid="link-to-profile"
                    >
                      Perfil
                    </Link>
                  </div>
                </section>
              </section>
            )
          }
        </header>
      );
    }
}

Header.propTypes = {
  classDiv: PropTypes.string.isRequired,
  classLink: PropTypes.string.isRequired,
  userImage: PropTypes.string,
};

Header.defaultProps = {
  userImage: '',
};

export default Header;

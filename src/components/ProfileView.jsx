import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileView extends Component {
  render() {
    const { user: { name, email, image, description } } = this.props;

    return (
      <section className="profile-container">
        <div className="profile-img">
          <img data-testid="profile-image" src={ image } alt={ name } />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
        <div className="profile-name">
          <p>Nome</p>
          <p>{name}</p>
        </div>
        <div className="profile-email">
          <p>E-mail</p>
          <p>{email}</p>
        </div>
        <div className="profile-description">
          <p>Descrição</p>
          <p>{description}</p>
        </div>
      </section>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ProfileView;

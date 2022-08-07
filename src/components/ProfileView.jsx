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
          <Link className="profile-edit" to="/profile/edit">Editar perfil</Link>
        </div>
        <div className="profile-name">
          <p className="profile-title">Nome</p>
          <p className="profile-content">{name}</p>
        </div>
        <div className="profile-email">
          <p className="profile-title">E-mail</p>
          <p className="profile-content">{email}</p>
        </div>
        <div className="profile-description">
          <p className="profile-title">Descrição</p>
          <p className="profile-content">{description}</p>
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

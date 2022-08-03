import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  state = {
    user: '',
    loading: true,
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const user = await getUser();
    this.setState({ loading: false, user });
  }

  render() {
    const { loading, user } = this.state;
    const { name, email, image, description } = user;

    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
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
          )
        }
      </div>
    );
  }
}

export default Profile;

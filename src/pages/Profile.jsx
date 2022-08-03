import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import ProfileView from '../components/ProfileView';

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

    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : <ProfileView user={ user } />
        }
      </div>
    );
  }
}

export default Profile;

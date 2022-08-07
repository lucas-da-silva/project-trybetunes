import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingBig from '../components/LoadingBig';
import ProfileView from '../components/ProfileView';
import '../styles/Profile.css';

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
        <Header classDiv="links-div-profile" classLink="link-profile" />
        {
          loading ? <LoadingBig /> : <ProfileView user={ user } />
        }
      </div>
    );
  }
}

export default Profile;

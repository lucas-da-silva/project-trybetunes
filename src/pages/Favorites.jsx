import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingSmall from '../components/LoadingSmall';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    loading: true,
    favoriteSongs: [],
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  removeFavoriteSong = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading ? <LoadingSmall /> : <MusicCard
            favoriteSongs={ favoriteSongs }
            musics={ favoriteSongs }
            removeFavoriteSong={ this.removeFavoriteSong }
          />
        }
      </div>
    );
  }
}

export default Favorites;

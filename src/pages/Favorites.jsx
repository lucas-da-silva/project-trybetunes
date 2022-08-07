import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingSmall from '../components/LoadingSmall';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

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
        <Header classDiv="links-div-favorites" classLink="link-favorites" />
        {
          loading ? <LoadingSmall /> : (
            <div className="container-favorites-musics">
              <p className="text-musics-favorites">Músicas favoritas:</p>
              <MusicCard
                havePicture
                favoriteSongs={ favoriteSongs }
                musics={ favoriteSongs }
                removeFavoriteSong={ this.removeFavoriteSong }
                classHr="hr-favorites"
                classMusicName="music-name-favorites"
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default Favorites;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: undefined,
    favoriteSongs: '',
    loading: true,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ musics, favoriteSongs, loading: false });
  }

  render() {
    const { musics, favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        {
          loading ? <Loading /> : (
            <div className="album-container">
              <section className="artist-name">
                <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
                <p data-testid="album-name">{musics[0].collectionName}</p>
                <p data-testid="artist-name">{musics[0].artistName}</p>
              </section>
              <section className="musics-play">
                <MusicCard
                  musics={ musics }
                  favoriteSongs={ favoriteSongs }
                />
              </section>
            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

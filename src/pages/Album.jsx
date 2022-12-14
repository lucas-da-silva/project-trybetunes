import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingBig from '../components/LoadingBig';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Album.css';

class Album extends Component {
  state = {
    musics: undefined,
    favoriteSongs: '',
    loading: true,
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ musics, favoriteSongs, loading: false });
  }

  render() {
    const { musics, favoriteSongs, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header classDiv="links-div-album" classLink="link-album" />

        {
          loading ? <LoadingBig /> : (
            <div className="album-container">
              <section className="artist-name">
                <img
                  className="img-album"
                  src={ musics[0].artworkUrl100 }
                  alt={ musics[0].collectionName }
                />
                <p
                  className="album-name"
                  data-testid="album-name"
                >
                  {musics[0].collectionName}
                </p>
                <p
                  className="album-artist"
                  data-testid="artist-name"
                >
                  {musics[0].artistName}
                </p>
              </section>
              <section className="musics-play">
                <MusicCard
                  musics={ musics.filter((music, index) => index !== 0) }
                  favoriteSongs={ favoriteSongs }
                  classHr="hr-album"
                  classMusicName="music-name-album"
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

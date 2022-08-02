import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state = {
      loading: false,
      id: [],
    }

    componentDidMount() {
      const { favoriteSongs } = this.props;
      this.setState({ id: favoriteSongs });
    }

    addFavoriteSong = (song) => {
      this.setState(
        { loading: true },
        async () => {
          await addSong(song);
          this.setState({ loading: false });
        },
      );
    }

    changeCheckbox = (song) => {
      const { id } = this.state;
      let idsFilters = [];

      if (id.length) {
        const isFound = id.find(({ trackId }) => trackId === song.trackId);
        if (isFound) {
          idsFilters = id.filter(({ trackId }) => trackId !== isFound.trackId);
        } else {
          idsFilters = [...id, song];
        }
      } else {
        idsFilters.push(song);
      }

      this.setState({ id: idsFilters });
    }

    render() {
      const { loading, id } = this.state;
      const { musics } = this.props;

      const musicsFilters = musics.filter((music, index) => index !== 0);
      const musicsHtml = musicsFilters.map((music) => {
        let checkboxFavorite = false;

        if (id.length) {
          id.forEach(({ trackId }) => {
            if (trackId === music.trackId) {
              checkboxFavorite = true;
            }
          });
        }

        return (
          <div key={ music.trackName }>
            <p>{music.trackName}</p>
            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="input-favorite-music">
              Favorita
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id="input-favorite-music"
                checked={ checkboxFavorite }
                onClick={ () => this.addFavoriteSong(music) }
                onChange={ () => this.changeCheckbox(music) }
              />
            </label>
          </div>
        );
      });

      return (
        <section>
          {
            loading ? <Loading /> : musicsHtml
          }
        </section>
      );
    }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
  })).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number,
  })).isRequired,
};

export default MusicCard;

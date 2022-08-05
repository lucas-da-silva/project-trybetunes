import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
    state = {
      loading: false,
      id: [],
    }

    componentDidMount() {
      const { favoriteSongs } = this.props;
      this.setState({ id: favoriteSongs });
    }

    changeCheckbox = async (song, { target }) => {
      const { checked } = target;
      let idsFilters;
      this.setState({ loading: true });

      if (checked) {
        await addSong(song);
        this.setState(({ id }) => ({ id: [...id, song] }));
      } else {
        await removeSong(song);
        const { id } = this.state;
        idsFilters = id.filter(({ trackId }) => trackId !== song.trackId);

        const { removeFavoriteSong } = this.props;
        if (removeFavoriteSong) {
          removeFavoriteSong();
        }
      }

      this.setState(() => {
        if (idsFilters) {
          return { id: idsFilters, loading: false };
        }

        return { loading: false };
      });
    }

    render() {
      const { loading, id } = this.state;
      const { musics } = this.props;

      const musicsHtml = musics.map((music) => {
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
                onChange={ (e) => this.changeCheckbox(music, e) }
              />
            </label>
          </div>
        );
      });

      return (
        <section>
          {
            loading ? <LoadingSmall /> : musicsHtml
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
  removeFavoriteSong: PropTypes.func,
};

MusicCard.defaultProps = {
  removeFavoriteSong: false,
};

export default MusicCard;

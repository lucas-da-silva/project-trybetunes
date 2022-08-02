import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
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

    changeFavoriteSong = (song, { target: { checked } }) => {
      this.setState(
        { loading: true },
        async () => {
          if (checked) {
            await addSong(song);
          } else {
            await removeSong(song);
          }
          this.setState({ loading: false });
        },
      );
    }

    changeCheckbox = (song, { target: { checked } }) => {
      if (checked) {
        this.setState(({ id }) => ({ id: [...id, song] }));
      } else {
        const { id } = this.state;
        const idsFilters = id.filter(({ trackId }) => trackId !== song.trackId);
        this.setState({ id: idsFilters });
      }
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
                onClick={ (e) => this.changeFavoriteSong(music, e) }
                onChange={ (e) => this.changeCheckbox(music, e) }
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

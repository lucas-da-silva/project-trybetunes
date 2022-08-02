import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state = {
      loading: false,
      id: [],
    }

    addFavoriteSong = (song) => {
      this.setState(
        { loading: true },
        async () => {
          await addSong(song);
          const { id } = this.state;
          let idsFilters = [];
          if (id.length) {
            const isFound = id.find((number) => number === song.trackId);
            if (isFound) {
              idsFilters = id.filter((number) => number !== isFound);
            } else {
              idsFilters = [...id, song.trackId];
            }
          } else {
            idsFilters.push(song.trackId);
          }
          this.setState({
            loading: false,
            id: idsFilters,
          });
        },
      );
    }

    render() {
      const { loading, id } = this.state;
      const { musics } = this.props;
      const musicsFilters = musics.filter((music, index) => index !== 0);
      const musicsHtml = musicsFilters.map((music) => {
        let checkboxFavorite = false;
        if (id.length) {
          id.forEach((number) => {
            if (number === music.trackId) {
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
                defaultChecked={ checkboxFavorite }
                onClick={ () => this.addFavoriteSong(music) }
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
};

export default MusicCard;

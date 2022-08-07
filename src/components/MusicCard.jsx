import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSmall from './LoadingSmall';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

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
      const { musics, havePicture, classHr, classMusicName } = this.props;

      const musicsHtml = musics.map((music) => {
        let checkboxFavorite = false;
        let picture;

        if (id.length) {
          id.forEach(({ trackId }) => {
            if (trackId === music.trackId) {
              checkboxFavorite = true;
            }
          });
        }

        if (havePicture) {
          picture = (
            <img className="img-60" src={ music.artworkUrl60 } alt={ music.trackName } />
          );
        }

        return (
          <section className="album-section" key={ music.trackName }>
            <hr className={ classHr } />
            <div className="container-musics">
              {picture}
              <p className={ `music-name ${classMusicName}` }>{music.trackName}</p>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id="heart"
                checked={ checkboxFavorite }
                onChange={ (e) => this.changeCheckbox(music, e) }
              />
            </div>
          </section>
        );
      });

      return (
        <section className="container-musics-album">
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
  havePicture: PropTypes.bool,
  classHr: PropTypes.string.isRequired,
  classMusicName: PropTypes.string.isRequired,
};

MusicCard.defaultProps = {
  removeFavoriteSong: false,
  havePicture: false,
};

export default MusicCard;

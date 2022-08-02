import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    const musicsFilters = musics.filter((music, index) => index !== 0);
    console.log(musicsFilters);
    const musicsHtml = musicsFilters.map(({ previewUrl, trackName }) => (
      <div key={ trackName }>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    ));

    return (
      <section>
        { musicsHtml }
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

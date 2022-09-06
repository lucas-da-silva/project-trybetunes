import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingBig from '../components/LoadingBig';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

const MIN_LENGTH_INPUT = 2;

class Search extends Component {
  state = {
    valueArtistInput: '',
    artistSearch: '',
    loading: false,
    albums: undefined,
    isDisabled: true,
  }

  handleChange = ({ target: { value } }) => {
    let isDisabled = false;
    if (value.length < MIN_LENGTH_INPUT) {
      isDisabled = true;
    }

    this.setState({
      valueArtistInput: value,
      isDisabled,
    });
  }

  searchForArtist = () => {
    const { valueArtistInput } = this.state;

    this.setState(
      { loading: true, artistSearch: valueArtistInput },
      async () => {
        const albums = await searchAlbumsAPI(valueArtistInput);
        this.setState({
          loading: false,
          albums,
          valueArtistInput: '',
          isDisabled: true,
        });
      },
    );
  }

  render() {
    const { valueArtistInput, loading, albums,
      artistSearch, isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header classDiv="links-div-search" classLink="link-search" />
        {
          loading ? <LoadingBig /> : (
            <form className="search-artist-form">
              <input
                type="text"
                className="search-artist-input"
                placeholder="Nome do Artista"
                value={ valueArtistInput }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
              <button
                className="search-artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.searchForArtist }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          albums && albums.length > 0 && (
            <section className="albums-section-container">
              <h2 className="result-search-artist">
                Resultado de álbuns de:
                {' '}
                {artistSearch}
              </h2>
              <div className="albums-div-container">
                { albums.map((album) => (
                  <div className="album" key={ album.collectionId }>
                    <Link
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/project-trybetunes/album/${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                    </Link>
                    <p className="name-album">{album.collectionName}</p>
                    <p className="name-artist">{album.artistName}</p>
                  </div>
                )) }
              </div>
            </section>
          )
        }
        {
          albums && albums.length === 0 && <h1>Nenhum álbum foi encontrado</h1>
        }
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_LENGTH_INPUT = 2;

class Search extends Component {
  state = {
    lengthArtistInput: 0,
    valueArtistInput: '',
    artistSearch: '',
    loading: false,
    albums: undefined,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      lengthArtistInput: value.length,
      valueArtistInput: value,
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
        });
      },
    );
  }

  render() {
    const { lengthArtistInput, valueArtistInput, loading, albums,
      artistSearch } = this.state;

    let isDisabled = false;
    if (lengthArtistInput < MIN_LENGTH_INPUT) {
      isDisabled = true;
    }

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading /> : (
            <form>
              <input
                type="text"
                id="search-artist-input"
                placeholder="Nome do Artista"
                value={ valueArtistInput }
                onChange={ this.handleChange }
                data-testid="search-artist-input"
              />
              <button
                id="search-artist-button"
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
            <section className="albums-container">
              <h2>
                Resultado de álbuns de:
                {' '}
                {artistSearch}
              </h2>
              { albums.map((album) => (
                <div key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </Link>
                  <p>{album.collectionName}</p>
                  <p>{album.artistName}</p>
                </div>
              )) }
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

import React, { Component } from 'react';
import '../styles/LoadingSmall.css';

class Loading extends Component {
  render() {
    return (
      <section className="loading-small">
        <h1 className="loading-small-text">Carregando...</h1>
      </section>
    );
  }
}

export default Loading;

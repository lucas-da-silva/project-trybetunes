import React, { Component } from 'react';
import '../styles/LoadingBig.css';

class Loading extends Component {
  render() {
    return (
      <section className="loading-big">
        <h1 className="loading-big-text">Carregando...</h1>
      </section>
    );
  }
}

export default Loading;

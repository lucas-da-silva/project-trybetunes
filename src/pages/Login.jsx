import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import LoadingSmall from '../components/LoadingSmall';
import '../styles/Login.css';
import LOGOBIG from '../images/logoBig.png';

const MIN_LENGTH_INPUT = 3;

class Login extends Component {
  state = {
    lengthNameInput: 0,
    valueNameInput: '',
    loading: false,
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      lengthNameInput: value.length,
      valueNameInput: value,
    });
  }

  savingUser = async () => {
    this.setState(
      { loading: true },
      async () => {
        const { loginRedirect } = this.props;
        const { valueNameInput } = this.state;
        await createUser({ name: valueNameInput });
        loginRedirect();
      },
    );
  }

  render() {
    const { lengthNameInput, loading } = this.state;

    let isDisabled = false;
    if (lengthNameInput < MIN_LENGTH_INPUT) {
      isDisabled = true;
    }

    return (
      <div data-testid="page-login">
        {
          loading ? <LoadingSmall /> : (
            <div className="login-container">
              <img
                src={ LOGOBIG }
                alt="Logo TrybeTunes"
                className="logo-trybetunes"
              />
              <form className="login-form">
                <input
                  type="text"
                  name="login-name-input"
                  onChange={ this.handleChange }
                  placeholder="Nome"
                  id="login-name-input"
                  data-testid="login-name-input"
                />
                <button
                  type="button"
                  id="login-submit-button"
                  disabled={ isDisabled }
                  onClick={ this.savingUser }
                  data-testid="login-submit-button"
                >
                  Entrar
                </button>
              </form>
            </div>
          )
        }
      </div>
    );
  }
}

Login.propTypes = {
  loginRedirect: PropTypes.func.isRequired,
};

export default Login;

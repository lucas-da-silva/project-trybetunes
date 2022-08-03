import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileEditHtml extends Component {
  render() {
    const { imageInput, nameInput, emailInput, descriptionInput, saveButtonDisabled,
      onInputChange, updateInfos } = this.props;

    return (
      <section className="form-container">
        <form className="profile-input">
          <div className="edit-div-profile">
            <img src={ imageInput } alt={ nameInput } />
            <input
              data-testid="edit-input-image"
              type="text"
              name="imageInput"
              value={ imageInput }
              onChange={ onInputChange }
              placeholder="Insira um link"
            />
          </div>
          <div className="edit-div-name">
            <label htmlFor="edit-input-name">
              Nome
              <input
                data-testid="edit-input-name"
                id="edit-input-name"
                name="nameInput"
                value={ nameInput }
                onChange={ onInputChange }
                type="text"
              />
            </label>
          </div>
          <div className="edit-div-email">
            <label htmlFor="edit-input-email">
              E-mail
              <input
                data-testid="edit-input-email"
                type="email"
                name="emailInput"
                value={ emailInput }
                onChange={ onInputChange }
                id="edit-input-email"
              />
            </label>
          </div>
          <div className="edit-div-description">
            <label htmlFor="edit-input-description">
              Descrição
              <input
                data-testid="edit-input-description"
                type="text"
                name="descriptionInput"
                value={ descriptionInput }
                onChange={ onInputChange }
                id="description"
              />
            </label>
          </div>
          <button
            id="edit-button-save"
            type="button"
            disabled={ saveButtonDisabled }
            onClick={ updateInfos }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      </section>
    );
  }
}

ProfileEditHtml.propTypes = {
  imageInput: PropTypes.string.isRequired,
  nameInput: PropTypes.string.isRequired,
  emailInput: PropTypes.string.isRequired,
  descriptionInput: PropTypes.string.isRequired,
  saveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  updateInfos: PropTypes.func.isRequired,
};

export default ProfileEditHtml;

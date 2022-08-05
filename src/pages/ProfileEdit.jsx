import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import LoadingSmall from '../components/LoadingSmall';
import ProfileEditHtml from '../components/ProfileEditHtml';

class ProfileEdit extends Component {
  state = {
    loading: true,
    imageInput: '',
    nameInput: '',
    emailInput: '',
    descriptionInput: '',
    saveButtonDisabled: true,
    redirect: false,
  }

  componentDidMount = async () => {
    await this.handleApi();
    this.validationButtonSave();
  }

  handleApi = async () => {
    const user = await getUser();
    const { name, image, email, description } = user;
    this.setState({
      loading: false,
      imageInput: image,
      nameInput: name,
      emailInput: email,
      descriptionInput: description,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.validationButtonSave();
    });
  }

  validationButtonSave = () => {
    const { imageInput, nameInput, emailInput, descriptionInput } = this.state;
    let isDisabled = true;
    const regex = /\S+@\S+\.\S+/;

    if (nameInput.length && descriptionInput.length && imageInput.length
      && emailInput.length && regex.test(emailInput)) {
      isDisabled = false;
    }

    this.setState({ saveButtonDisabled: isDisabled });
  }

  updateInfos = async () => {
    const { imageInput, nameInput, emailInput, descriptionInput } = this.state;
    this.setState({ loading: true });

    await updateUser({
      name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descriptionInput,
    });

    this.setState({ redirect: true });
  }

  render() {
    const { loading, saveButtonDisabled, imageInput, nameInput, emailInput,
      descriptionInput, redirect } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          redirect && <Redirect to="/profile" />
        }
        {
          loading ? <LoadingSmall /> : <ProfileEditHtml
            saveButtonDisabled={ saveButtonDisabled }
            imageInput={ imageInput }
            nameInput={ nameInput }
            emailInput={ emailInput }
            descriptionInput={ descriptionInput }
            onInputChange={ this.onInputChange }
            updateInfos={ this.updateInfos }
          />
        }
      </div>
    );
  }
}

export default ProfileEdit;

import React from 'react';
import { func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { user } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      buttonDisabled: true,
      redirect: false,
    };
  }

  validEmail = (email) => {
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return regex.test(email);
  };

  handleChange = (event) => {
    const { email, senha } = this.state;
    const { target: { name, value } } = event;
    this.setState({ [name]: value },
      () => {
        const LENGTHSENHA = 5;
        const senhaValid = senha.length >= LENGTHSENHA;
        const emailValid = this.validEmail(email);
        this.setState({ buttonDisabled: !(senhaValid && emailValid) });
      });
  }

  handleClick = () => {
    const { props: { saveUser }, state: { email },
    } = this;
    saveUser(email);
    this.setState({ redirect: true });
  };

  render() {
    const { email, senha, buttonDisabled, redirect } = this.state;
    return (
      <>
        <h1>TrybeWallet</h1>
        { redirect && <Redirect to="/carteira" />}
        <fildset>
          <label htmlFor="email">
            Email
            <br />
            <input
              label="Email: "
              type="email"
              name="email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="email-input"
              required
            />
          </label>
          <label htmlFor="senha">
            Senha
            <br />
            <input
              label="Senha: "
              type="password"
              name="senha"
              id="senha"
              onChange={ this.handleChange }
              value={ senha }
              data-testid="password-input"
              required
            />
          </label>
          <button
            label="Entrar"
            type="button"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </fildset>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (state) => dispatch(user(state)),
});

Login.propTypes = {
  saveUser: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// Como validar emails com regex: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, shape } from 'prop-types';

class Header extends Component {
  render() {
    const { props: { email, expenses } } = this;
    return (
      <div className="data-user">
        <p data-testid="email-field">
          Email:
          { email }
        </p>
        <p data-testid="total-field">
          Despesa total:
          {
            expenses
              ? expenses.reduce((acc, { value, exchangeRates, currency }) => acc
              + (+value * +exchangeRates[currency].ask), 0)
              : 0
          }
        </p>
        <p data-testid="header-currency-field">
          Moeda de câmbio: BRL
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: string.isRequired,
  expenses: shape({}).isRequired,
};

export default connect(mapStateToProps, null)(Header);

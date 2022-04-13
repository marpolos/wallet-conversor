import { func, bool, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { thunkCoins, createWalletData, getCoins } from '../actions/index';
import Loading from './Loading';

const INITIAL_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { props: { insertExpense, expenses },
    } = this;
    const exchangeRates = await getCoins();
    insertExpense({ ...this.state,
      exchangeRates,
      id: expenses.length,
    });
    this.setState({ value: 0, description: '' });
  }

  componentDidMount = () => {
    const { fetchCoins } = this.props;
    fetchCoins();
    // this.setState({ exchangeRates: currencies });
    /* const { method, tag } = this.state;
    console.log(method, tag); */
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { isLoading, currencies } = this.props;

    if (isLoading) {
      return <Loading />;
    }

    return (
      isLoading ? <Loading />
        : (
          <fieldset className="set-expense">
            <legend>Despesa</legend>
            <label htmlFor="value">
              Valor
              <br />
              <input
                type="number"
                step="0.01"
                data-testid="value-input"
                id="value"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <br />
              <input
                type="text"
                data-testid="description-input"
                id="description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                placeholder="Descrição"
              />
            </label>
            <label htmlFor="currency">
              Moeda
              <br />
              <select
                type="text"
                data-testid="currency-input"
                name="currency"
                id="currency"
                value={ currency }
                onChange={ this.handleChange }
                required
              >
                {
                  Object.entries(currencies)
                    .filter((curr) => curr[0] !== 'USDT')
                    .map((option, index) => (
                      <option
                        key={ index }
                        data-testid={ option[0] }
                      >
                        { option[0] }
                      </option>
                    ))
                }
              </select>
            </label>
            <label htmlFor="method">
              Método
              <br />
              <select
                type="text"
                data-testid="method-input"
                name="method"
                id="method"
                value={ method }
                onChange={ this.handleChange }
                required
              >
                {/*  {
                  method.map((option, index) => (
                    <option key={ index }>{ option }</option>
                  ))
                } */}
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag">
              Categoria
              <br />
              <select
                type="text"
                data-testid="tag-input"
                name="tag"
                id="tag"
                value={ tag }
                onChange={ this.handleChange }
                required
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Transporte</option>
                <option>Trabalho</option>
                <option>Saúde</option>
              </select>
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>
          </fieldset>
        )
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  insertExpense: (state) => dispatch(createWalletData(state)),
  fetchCoins: () => dispatch(thunkCoins()),
  // deleteData: (state) => dispatch(deleteWalletData(state)),
  // editData: (state) => dispatch(editWalletData(state)),
});

Expenses.propTypes = {
  insertExpense: func.isRequired,
  fetchCoins: func.isRequired,
  isLoading: bool.isRequired,
  currencies: shape({}).isRequired,
  expenses: shape({}).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
